"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, CheckCircle, Loader2 } from "lucide-react";
import { doc, onSnapshot, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>(500);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [purpose, setPurpose] = useState("general");
  const [donorInfo, setDonorInfo] = useState({ name: "", email: "", phone: "" });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingDonationId, setPendingDonationId] = useState<string | null>(null);

  // Add a timeout so the user isn't stuck forever if the callback fails
  useEffect(() => {
    if (!pendingDonationId) return;
    const timer = setTimeout(() => {
      setError("We haven't received confirmation from Safaricom yet. If you paid, please wait a moment and check your email. Otherwise, try again.");
      setPendingDonationId(null);
    }, 60000); // 60 seconds
    return () => clearTimeout(timer);
  }, [pendingDonationId]);

  // Listen for the payment status (Safaricom Callback will update Firestore)
  useEffect(() => {
    if (!pendingDonationId || submitted) return;
    const unsub = onSnapshot(doc(db, "donations", pendingDonationId), (snap) => {
      const s = snap.data()?.status;
      if (s === "completed") {
        setSubmitted(true);
        unsub();
      } else if (s === "failed") {
        setError("Payment was not completed. Please try again.");
        setPendingDonationId(null);
        unsub();
      }
    });
    return () => unsub();
  }, [pendingDonationId, submitted]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 10) {
      setError("Minimum donation is KSh 10.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create pending donation in Firestore
      const docRef = await addDoc(collection(db, "donations"), {
        amount: numericAmount, currency: "KES", frequency, purpose,
        donorName: donorInfo.name, donorEmail: donorInfo.email, donorPhone: donorInfo.phone,
        status: "pending", paymentMethod: "mpesa", timestamp: serverTimestamp(),
      });

      // 2. Trigger M-Pesa STK Push
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: donorInfo.phone,
          amount: numericAmount,
          donationId: docRef.id, 
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send M-Pesa request");

      // 3. Save CheckoutRequestID so the callback can find this donation
      await updateDoc(doc(db, "donations", docRef.id), { 
        checkoutRequestId: data.CheckoutRequestID, 
        status: "processing" 
      });

      // 4. Show the "Waiting for PIN" screen
      setPendingDonationId(docRef.id);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16"><div className="container py-12">
        <div className="max-w-xl mx-auto bg-green-50 p-8 rounded-xl border border-green-200 text-center">
          <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You for Your Support!</h2>
          <p className="text-green-700 mb-6">Your donation was successful. A receipt has been sent to your email.</p>
          <Link href="/" className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold inline-block">Back to Home</Link>
        </div>
      </div></main>
    );
  }

  if (pendingDonationId) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16"><div className="container py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <Loader2 size={48} className="mx-auto text-[#007eb4] mb-4 animate-spin" />
          <h2 className="text-2xl font-bold mb-2">Check Your Phone</h2>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent an M-Pesa request to <strong>{donorInfo.phone}</strong>.
            Enter your <strong>M-Pesa PIN</strong> on your phone to confirm your donation of <strong>KSh {Number(amount).toLocaleString()}</strong>.
          </p>
          <p className="text-sm text-gray-400">Waiting for confirmation from Safaricom…</p>
        </div>
      </div></main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16"><div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">How Your Donation Helps</h1>
      <p className="text-center text-gray-600 mb-8">Every contribution helps us rescue, rehabilitate and reintegrate young people in Majengo.</p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleDonate} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          
          {/* AMOUNT SELECTOR */}
          <div>
            <h2 className="text-lg font-bold mb-3">Donation Amount (KSh)</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {[100, 500, 1000, 5000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`px-4 py-2 rounded-lg border font-medium transition ${Number(amount) === preset ? 'bg-[#007eb4] text-white border-[#007eb4]' : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-medium">KSh</span>
              <input 
                type="number" 
                min="10"
                required 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]" 
                placeholder="Custom Amount" 
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">Your Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" required value={donorInfo.name} onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" required value={donorInfo.email} onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">M-Pesa Phone Number *</label>
                <input type="tel" required value={donorInfo.phone} onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]" placeholder="07XX XXX XXX" />
              </div>
            </div>
          </div>

          {error && <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-700 text-sm">{error}</div>}

          <button type="submit" disabled={loading}
            className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold w-full hover:bg-[#005a8a] transition disabled:opacity-50">
            {loading ? (<><Loader2 size={18} className="inline mr-2 animate-spin" /> Sending Request…</>) :
              (<><Heart size={18} className="inline mr-2" /> Donate KSh {Number(amount || 0).toLocaleString()} via M-Pesa</>)}
          </button>
        </form>
      </div>
    </div></main>
  );
}
