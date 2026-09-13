import { Home, Clock, Users, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function DropInCentrePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero.png"
            alt="Drop-in Centre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Drop-in Centre
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              A safe, welcoming space in Majengo where clients can access food,
              counselling, referrals, and rest.
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
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Safe Space</h3>
              <p className="text-gray-600 text-sm">
                A non-judgmental environment where you can rest and feel safe.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Counselling</h3>
              <p className="text-gray-600 text-sm">
                Professional support to help you understand and overcome
                addiction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Home size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Referrals</h3>
              <p className="text-gray-600 text-sm">
                We connect you to hospitals, MAT programmes, and other services.
              </p>
            </div>
          </div>
        </div>

        {/* Hours & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Clock size={20} className="mr-2 text-[#007eb4]" />
              Opening Hours
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-bold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-bold">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-bold">Closed</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-[#007eb4]" />
              Confidentiality
            </h2>
            <p className="text-gray-600 mb-4">
              All services are free and completely confidential. No registration
              required to visit.
            </p>
            <Link
              href="/get-help"
              className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition inline-block"
            >
              Get Help Now
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="text-[#007eb4] font-bold hover:underline"
          >
            Contact us for more information →
          </Link>
        </div>
      </div>
    </main>
  );
}
