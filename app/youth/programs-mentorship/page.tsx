import { Users, GraduationCap, Wrench, Heart } from "lucide-react";
import Link from "next/link";

export default function ProgramsMentorshipPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/crime.webp"
            alt="Youth Programs & Mentorship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Youth Programs & Mentorship
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Practical skills, education, and mentorship to help youth build a
              brighter future.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Programs */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Users size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Mentorship</h3>
              </div>
              <p className="text-gray-600 text-sm">
                One-on-one mentorship from positive role models who have
                overcome similar challenges.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <GraduationCap size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Education Support</h3>
              </div>
              <p className="text-gray-600 text-sm">
                School re-entry, scholarships, and tutoring to help youth
                succeed in school.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Wrench size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Vocational Training</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Carpentry, tailoring, computer skills, and entrepreneurship
                training.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <Heart size={24} className="text-[#007eb4] mr-3" />
                <h3 className="text-xl font-bold">Life Skills</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Workshops on communication, decision-making, and financial
                literacy.
              </p>
            </div>
          </div>
        </div>

        {/* How to Join */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4">How Youth Can Join</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              1. Self-referral - youth can come to us directly
            </p>
            <p className="text-gray-600">
              2. Family referral - parents or guardians can refer their children
            </p>
            <p className="text-gray-600">
              3. School referral - teachers can refer students
            </p>
            <p className="text-gray-600">
              4. Community referral - community leaders or neighbours can refer
            </p>
          </div>
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block mt-4"
          >
            Join a Program
          </Link>
        </div>
      </div>
    </main>
  );
}
