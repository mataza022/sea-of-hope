import { UtensilsCrossed, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/food.jpg"
            alt="Food Programme"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Food Programme
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Daily nutritious meals for clients, because recovery requires
              physical strength.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Why Nutrition Matters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <UtensilsCrossed size={20} className="mr-2 text-[#007eb4]" />
            Why Nutrition Matters
          </h2>
          <p className="text-gray-600 mb-4">
            Recovery is hard on the body. Proper nutrition helps rebuild
            strength, improve mood, and support overall health. Our Food
            Programme ensures clients don't have to worry about where their next
            meal comes from.
          </p>
        </div>

        {/* What We Provide */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <UtensilsCrossed
                size={32}
                className="mx-auto text-[#007eb4] mb-3"
              />
              <h3 className="text-xl font-bold mb-2">Daily Meals</h3>
              <p className="text-gray-600 text-sm">
                Balanced meals served every day at the Drop-in Centre.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Nutritional Support</h3>
              <p className="text-gray-600 text-sm">
                Guidance on healthy eating during recovery.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users size={32} className="mx-auto text-[#007eb4] mb-3" />
              <h3 className="text-xl font-bold mb-2">Community Meals</h3>
              <p className="text-gray-600 text-sm">
                Shared meals that build community and connection.
              </p>
            </div>
          </div>
        </div>

        {/* Donation Appeal */}
        <div className="bg-[#005a8a] text-white p-8 rounded-xl shadow-lg text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Help Us Feed Someone Today
          </h2>
          <p className="mb-6">
            KSh 100 = 1 meal. Your donation makes a direct impact.
          </p>
          <Link
            href="/donate"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition inline-block"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </main>
  );
}
