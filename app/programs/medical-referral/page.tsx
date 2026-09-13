import { Stethoscope, Ambulance, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function MedicalReferralPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/medical-referral.jpg"
            alt="Hospital & Medical Referral"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Hospital & Medical Referral
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Partnerships with hospitals to ensure beneficiaries get medical
              treatment when needed.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* What is Medical Referral */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Stethoscope size={20} className="mr-2 text-[#007eb4]" />
            What is Medical Referral?
          </h2>
          <p className="text-gray-600 mb-4">
            We partner with hospitals to ensure our beneficiaries get the
            medical care they need. From withdrawal management to emergency
            care, we connect you with the right healthcare providers.
          </p>
        </div>

        {/* Conditions We Refer */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Conditions We Refer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Ambulance size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Emergency Care</h3>
              <p className="text-gray-600 text-sm">
                Immediate medical attention for overdoses and injuries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">HIV/AIDS Treatment</h3>
              <p className="text-gray-600 text-sm">
                Access to antiretroviral therapy and ongoing care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Stethoscope size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Mental Health</h3>
              <p className="text-gray-600 text-sm">
                Psychiatric support for co-occurring conditions.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              1. Visit the Drop-in Centre or call 0727 328 122
            </p>
            <p className="text-gray-600">2. We assess your needs</p>
            <p className="text-gray-600">
              3. We refer you to a partner hospital
            </p>
            <p className="text-gray-600">
              4. You receive treatment and follow-up
            </p>
          </div>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block mt-4"
          >
            Get Referred
          </Link>
        </div>

        {/* Confidentiality */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield size={20} className="mr-2 text-[#007eb4]" />
            Confidential
          </h2>
          <p className="text-gray-600">
            All referrals are handled confidentially. Your medical information
            is protected.
          </p>
        </div>
      </div>
    </main>
  );
}
