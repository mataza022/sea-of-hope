"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

export default function StripeCardForm({
  clientSecret,
  donationId,
  onSuccess,
}: {
  clientSecret: string;
  donationId: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    // Remember donationId so it survives 3DS redirects
    sessionStorage.setItem("soh_pending_donation", donationId);

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setError(submitErr.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    const { error: confirmErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: `${window.location.origin}/donate` },
      redirect: "if_required",
    });

    if (confirmErr) {
      setError(confirmErr.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      sessionStorage.removeItem("soh_pending_donation");
      onSuccess();
    } else {
      setError("Payment requires further action");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold w-full hover:bg-[#005a8a] transition disabled:opacity-50"
      >
        {processing ? (<><Loader2 size={18} className="inline mr-2 animate-spin" /> Processing…</>) : "Pay with Card"}
      </button>
    </form>
  );
}
