import { Shield, BookOpen, Briefcase, Users } from "lucide-react";
import Link from "next/link";

export default function CrimePreventionPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/crime.webp"
            alt="Youth Crime Prevention"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Youth Crime Prevention
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              We work with at-risk youth to prevent crime, provide alternatives,
              and build brighter futures.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* The Problem */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4">The Problem</h2>
          <p className="text-gray-600 mb-4">
            Many youth in Majengo are at risk of joining gangs, engaging in
            crime, or falling into substance abuse. Factors include poverty,
            lack of education, peer pressure, and family breakdown.
          </p>
        </div>

        {/* How We Help */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How We Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Shield size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Early Intervention</h3>
              <p className="text-gray-600 text-sm">
                We identify at-risk youth and intervene before they get involved
                in crime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <BookOpen size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-600 text-sm">
                We support school re-entry and provide tutoring and
                scholarships.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Briefcase size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Vocational Training</h3>
              <p className="text-gray-600 text-sm">
                We offer practical skills like carpentry, tailoring, and
                computer skills.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/get-help"
            className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block"
          >
            Get Help Now
          </Link>
        </div>
      </div>
    </main>
  );
}
