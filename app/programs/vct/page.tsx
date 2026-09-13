import { FlaskConical, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function VCTPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/vct.jpg"
            alt="VCT Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              VCT Services
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Voluntary Counselling and Testing for HIV with full
              confidentiality.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Services Provided */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FlaskConical size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Confidential Testing</h3>
              <p className="text-gray-600 text-sm">
                Rapid HIV testing with immediate results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Counselling</h3>
              <p className="text-gray-600 text-sm">
                Pre and post-test counselling to support you.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Referral</h3>
              <p className="text-gray-600 text-sm">
                Referral for treatment if results are positive.
              </p>
            </div>
          </div>
        </div>

        {/* Confidentiality */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield size={20} className="mr-2 text-[#007eb4]" />
            Your Privacy is Protected
          </h2>
          <p className="text-gray-600 mb-4">
            Your results are confidential and only shared with you. We do not
            disclose your status to anyone without your consent.
          </p>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
