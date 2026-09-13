"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  UtensilsCrossed,
  Pill,
  MapPin,
  CheckCircle,
  Phone,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DonatePage() {
  const [amount, setAmount] = useState(500);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time"
  );
  const [purpose, setPurpose] = useState("general");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "donations"), {
        amount,
        frequency,
        purpose,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        timestamp: serverTimestamp(),
        status: "pending",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving donation:", err);
      setError(
        "There was an error processing your donation. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  const impactOptions = [
    { amount: 500, description: "Provides 2 meals", icon: UtensilsCrossed },
    {
      amount: 1000,
      description: "Provides a counselling session",
      icon: Heart,
    },
    { amount: 5000, description: "Supports recovery for a day", icon: Pill },
    { amount: 10000, description: "Funds an outreach visit", icon: MapPin },
  ];

  const purposeOptions = [
    { id: "general", label: "Where Most Needed", icon: Heart },
    { id: "food", label: "Food Programme", icon: UtensilsCrossed },
    { id: "medicine", label: "Medicine & Recovery", icon: Pill },
    { id: "outreach", label: "Outreach Programme", icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          How Your Donation Helps
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Every contribution helps us rescue, rehabilitate and reintegrate young
          people in Majengo.
        </p>

        {submitted ? (
          <div className="max-w-xl mx-auto bg-green-50 p-8 rounded-xl border border-green-200 text-center">
            <div className="text-5xl mb-4">
              <CheckCircle size={48} className="mx-auto text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Thank You for Your Support!
            </h2>
            <p className="text-green-700 mb-6">
              Your generosity will make a real difference in the lives of people
              in our community.
            </p>
            <Link
              href="/"
              className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold inline-block"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Impact Calculator */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-lg font-bold mb-4">
                What Your Donation Does
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {impactOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.amount}
                      onClick={() => setAmount(option.amount)}
                      className={`p-4 rounded-lg border-2 text-center transition ${
                        amount === option.amount
                          ? "border-[#007eb4] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={24} className="mx-auto mb-2 text-[#007eb4]" />
                      <div className="font-bold">
                        KSh {option.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                placeholder="Or enter custom amount (KSh)"
                min={50}
              />
            </div>

            {/* Donation Form */}
            <form
              onSubmit={handleDonate}
              className="bg-white p-8 rounded-xl shadow-lg space-y-6"
            >
              {/* Frequency */}
              <div>
                <h2 className="text-lg font-bold mb-3">Frequency</h2>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency("one-time")}
                    className={`flex-1 p-3 rounded-lg border-2 transition ${
                      frequency === "one-time"
                        ? "border-[#007eb4] bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`flex-1 p-3 rounded-lg border-2 transition ${
                      frequency === "monthly"
                        ? "border-[#007eb4] bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <h2 className="text-lg font-bold mb-3">
                  Where Should Your Donation Go?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {purposeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPurpose(option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition flex items-center ${
                          purpose === option.id
                            ? "border-[#007eb4] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon size={20} className="mr-3 text-[#007eb4]" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Donor Info */}
              <div>
                <h2 className="text-lg font-bold mb-3">Your Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorInfo.name}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, email: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, phone: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold w-full hover:bg-[#005a8a] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart size={18} className="inline mr-2" />
                {loading
                  ? "Processing..."
                  : `Donate KSh ${amount.toLocaleString()}`}
              </button>

              <p className="text-center text-sm text-gray-500">
                Secure payment. Your information is protected.
              </p>
            </form>

            {/* Alternative Donation Methods */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-center mb-4">
                Other Ways to Donate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2">M-Pesa</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Send to: <span className="font-bold">0727 328 122</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Please include your name and purpose in the message.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2">Bank Transfer</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Contact us for bank details.
                  </p>
                  <a
                    href="tel:+254727328122"
                    className="text-[#007eb4] font-bold text-sm hover:underline"
                  >
                    <Phone size={14} className="inline mr-1" />
                    0727 328 122
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
