import { MessageCircle, Users, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function CounsellingPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/counselling.jpg"
            alt="Counselling Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Counselling Services
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Professional counselling to help beneficiaries understand and
              overcome addiction.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Types of Counselling */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Types of Counselling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <MessageCircle size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">One-on-One Sessions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Individual counselling to assess your needs and develop a
                personalized treatment plan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Users size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Family Sessions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Help families understand addiction and rebuild relationships.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Heart size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Group Sessions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Peer support to learn from others who are on the same journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Shield size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Support Groups (S.L.P)</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Sober Living Programme for ongoing recovery support.
              </p>
            </div>
          </div>
        </div>

        {/* Confidentiality */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield size={20} className="mr-2 text-[#007eb4]" />
            Confidential & Supportive
          </h2>
          <p className="text-gray-600 mb-4">
            All counselling sessions are confidential. Our counsellors are
            trained professionals who treat you with dignity and respect.
          </p>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </main>
  );
}
