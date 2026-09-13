import { MapPin, Syringe, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/outreach.jpg"
            alt="Outreach Programme"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Outreach Programme
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              We go into the community to provide services directly to people
              who use drugs, and to identify young people who may be at risk of
              falling into crime.
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
              <Syringe size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">NSP</h3>
              <p className="text-gray-600 text-sm">
                Needle & Syringe Programme to prevent disease transmission.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Shield size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Condom Distribution</h3>
              <p className="text-gray-600 text-sm">
                Free condoms to promote safe practices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Health Talks</h3>
              <p className="text-gray-600 text-sm">
                Education on HIV, hepatitis, and harm reduction.
              </p>
            </div>
          </div>
        </div>

        {/* Youth Crime Prevention */}
        <div className="bg-[#007eb4] text-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield size={20} className="mr-2" />
            Preventing Youth from Falling into Crime
          </h2>
          <p className="text-gray-100 mb-4">
            During our outreach, we actively look for young people who may be at
            risk of falling into crime. We identify those who are vulnerable,
            build relationships with them, and connect them to education,
            mentorship, and support programmes before they take that path.
          </p>
          <Link
            href="/youth/crime-prevention"
            className="bg-white text-[#007eb4] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Learn More About Youth Crime Prevention
          </Link>
        </div>

        {/* Areas Covered */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MapPin size={20} className="mr-2 text-[#007eb4]" />
            Areas We Cover
          </h2>
          <p className="text-gray-600 mb-4">
            We visit various locations in Majengo and surrounding Nairobi
            neighborhoods every day.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Majengo", "Kibokoni", "Ganjoni", "Mvita", "Pumwani"].map(
              (area) => (
                <span
                  key={area}
                  className="bg-blue-50 text-[#007eb4] px-4 py-2 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              )
            )}
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
