import { Heart, Users, BookOpen, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FamilyCommunityPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/crime.webp"
            alt="Family & Community Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Family & Community Support
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Helping families and the community understand and support youth at
              risk.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Warning Signs */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Heart size={20} className="mr-2 text-[#007eb4]" />
            How to Recognize Warning Signs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                • Behavior changes (withdrawal, aggression)
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">• Substance use</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                • Unexplained money or possessions
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                • Association with gangs or negative peers
              </p>
            </div>
          </div>
        </div>

        {/* How to Help */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How to Help a Youth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <MessageCircle
                size={32}
                className="mx-auto text-[#007eb4] mb-3"
              />
              <h3 className="text-xl font-bold mb-2">Talk Openly</h3>
              <p className="text-gray-600 text-sm">
                Create a safe space for youth to share their feelings without
                judgment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Seek Professional Help</h3>
              <p className="text-gray-600 text-sm">
                Connect youth with counselling and support services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <BookOpen size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Offer Alternatives</h3>
              <p className="text-gray-600 text-sm">
                Encourage participation in education, sports, and vocational
                training.
              </p>
            </div>
          </div>
        </div>

        {/* Family Counselling */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Heart size={20} className="mr-2 text-[#007eb4]" />
            Family Counselling
          </h2>
          <p className="text-gray-600 mb-4">
            We provide family counselling sessions to help families understand
            addiction, rebuild relationships, and develop healthy communication
            skills.
          </p>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block"
          >
            Request Family Counselling
          </Link>
        </div>

        {/* Community Education */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Users size={20} className="mr-2 text-[#007eb4]" />
            Community Education
          </h2>
          <p className="text-gray-600 mb-4">
            We conduct school workshops, community forums, and sensitization
            campaigns to educate the community about youth crime prevention and
            substance abuse.
          </p>
        </div>
      </div>
    </main>
  );
}
