"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MessageSquare,
  Send,
  Shield,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GetHelpPage() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    substance: "",
    urgency: "moderate",
    phone: "",
    location: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "help_requests"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "new",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving help request:", err);
      setError(
        "There was an error submitting your request. Please call us directly at 0727 328 122."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Get Help
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Confidential. Anonymous. No judgment.
        </p>

        {/* Emergency Banner */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 mb-8">
          <h2 className="text-xl font-bold text-red-700 mb-2 flex items-center">
            <Phone size={20} className="mr-2" />
            Emergency?
          </h2>
          <p className="mb-4">
            If this is a medical emergency, call 999 or visit the nearest
            hospital.
          </p>
          <a
            href="tel:+254727328122"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold inline-block hover:bg-red-700 transition"
          >
            Call 0727 328 122
          </a>
        </div>

        {submitted ? (
          <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center">
            <div className="text-5xl mb-4">
              <Shield size={48} className="mx-auto text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              You've Taken the First Step
            </h2>
            <p className="text-green-700 mb-6">
              Our team will reach out to you within 24 hours. If this is an
              emergency, call us now:
            </p>
            <a
              href="tel:+254727328122"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold inline-block"
            >
              Call 0727 328 122
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-6"
          >
            {/* Step 1: Basic Info */}
            {formStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Basic Information</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    placeholder="Your name (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    What substance are you using?
                  </label>
                  <select
                    value={formData.substance}
                    onChange={(e) =>
                      setFormData({ ...formData, substance: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                  >
                    <option value="">Select... (confidential)</option>
                    <option value="heroin">Heroin / Brown</option>
                    <option value="cannabis">Cannabis / Bhang</option>
                    <option value="meth">Methamphetamine</option>
                    <option value="alcohol">Alcohol</option>
                    <option value="multiple">Multiple Substances</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setFormStep(2)}
                  className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold w-full hover:bg-[#005a8a] transition"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Contact & Urgency */}
            {formStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Contact & Urgency</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    placeholder="07XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    placeholder="Majengo, Nairobi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How urgent is this?
                  </label>
                  <div className="space-y-2">
                    <label className="block">
                      <input
                        type="radio"
                        name="urgency"
                        value="emergency"
                        checked={formData.urgency === "emergency"}
                        onChange={() =>
                          setFormData({ ...formData, urgency: "emergency" })
                        }
                        className="mr-2"
                      />
                      <span className="font-medium text-red-600">
                        Emergency
                      </span>{" "}
                      — Need help immediately
                    </label>
                    <label className="block">
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={formData.urgency === "urgent"}
                        onChange={() =>
                          setFormData({ ...formData, urgency: "urgent" })
                        }
                        className="mr-2"
                      />
                      <span className="font-medium text-orange-600">
                        Urgent
                      </span>{" "}
                      — Need help within 24 hours
                    </label>
                    <label className="block">
                      <input
                        type="radio"
                        name="urgency"
                        value="moderate"
                        checked={formData.urgency === "moderate"}
                        onChange={() =>
                          setFormData({ ...formData, urgency: "moderate" })
                        }
                        className="mr-2"
                      />
                      <span className="font-medium text-gray-600">
                        Not urgent
                      </span>{" "}
                      — Just want information
                    </label>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold flex-1 hover:bg-[#005a8a] transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Consent & Submit */}
            {formStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Confirmation</h2>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm">
                      I understand my information is confidential and will be
                      used only by Sea of Hope staff to provide support.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex-1 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} className="inline mr-2" />
                    {loading ? "Submitting..." : "Submit — I Need Help"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Alternative Contact */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Prefer to Talk Directly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="tel:+254727328122"
              className="bg-red-600 text-white px-6 py-4 rounded-xl text-center font-bold hover:bg-red-700 transition flex items-center justify-center"
            >
              <Phone size={18} className="mr-2" />
              Call Us
            </a>
            <a
              href="https://wa.me/254727328122"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-4 rounded-xl text-center font-bold hover:bg-green-700 transition flex items-center justify-center"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </a>
            <a
              href="sms:+254727328122"
              className="bg-blue-600 text-white px-6 py-4 rounded-xl text-center font-bold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <MessageSquare size={18} className="mr-2" />
              Text Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
