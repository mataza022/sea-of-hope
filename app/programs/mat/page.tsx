import { Pill, Stethoscope, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function MATPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/mat.jpeg"
            alt="Medication-Assisted Treatment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Medication-Assisted Treatment
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Support recovery with medical supervision and medication.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* What is MAT */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Pill size={20} className="mr-2 text-[#007eb4]" />
            What is MAT?
          </h2>
          <p className="text-gray-600 mb-4">
            Medication-Assisted Treatment (MAT) combines medication with
            counselling and behavioral therapies to treat substance use
            disorders. It helps manage withdrawal symptoms and cravings, making
            recovery more sustainable.
          </p>
        </div>

        {/* Services Provided */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Stethoscope size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Assessment</h3>
              <p className="text-gray-600 text-sm">
                Medical evaluation to determine the right treatment plan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Pill size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Medication</h3>
              <p className="text-gray-600 text-sm">
                Prescribed medication to manage withdrawal and cravings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Ongoing Support</h3>
              <p className="text-gray-600 text-sm">
                Continued counselling and support throughout your recovery.
              </p>
            </div>
          </div>
        </div>

        {/* How to Enroll */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4">How to Enroll</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              1. Visit our Drop-in Centre in Majengo
            </p>
            <p className="text-gray-600">2. Call us at 0727 328 122</p>
            <p className="text-gray-600">3. Get a referral from a hospital</p>
          </div>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block mt-4"
          >
            Get Started
          </Link>
        </div>

        {/* Confidentiality */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield size={20} className="mr-2 text-[#007eb4]" />
            Free & Confidential
          </h2>
          <p className="text-gray-600">
            MAT services are free and confidential. Your treatment is managed by
            qualified medical professionals.
          </p>
        </div>
      </div>
    </main>
  );
}
