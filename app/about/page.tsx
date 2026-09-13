import { Heart, Eye, Shield, Handshake, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero.png"
            alt="Sea of Hope Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>

        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              About Sea of Hope
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              We are a community-based organization in Majengo, Nairobi,
              dedicated to rescuing youth from crime and providing
              rehabilitation for people struggling with substance abuse.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Heart size={32} className="text-[#007eb4] mr-3" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To reduce the impact of substance abuse through harm reduction,
              treatment, and community support. We meet people where they are
              and walk with them on their journey to recovery.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Eye size={32} className="text-[#007eb4] mr-3" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              A community where every young person has the opportunity to live a
              healthy, productive, and fulfilling life free from crime and
              substance abuse.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-gray-600 text-sm">
                We treat every person with dignity, respect, and empathy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Shield size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Confidentiality</h3>
              <p className="text-gray-600 text-sm">
                We protect the privacy and anonymity of all our clients.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Handshake size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                We are rooted in the Majengo community and work with local
                partners.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={48} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold">Director</h3>
              <p className="text-gray-500 text-sm mt-1">
                Oversees all operations and funding
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={48} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold">Programme Manager</h3>
              <p className="text-gray-500 text-sm mt-1">
                Coordinates outreach, community, and clinical services
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={48} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold">Finance Manager</h3>
              <p className="text-gray-500 text-sm mt-1">
                Manages financial resources and accountability
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
