import Link from "next/link";
import { Heart } from "lucide-react";

export function DonateCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#007eb4] to-[#005a8a] text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Help Us Change Lives</h2>
          <p className="text-xl mb-8">
            Your donation provides food, medicine, counselling, and hope for
            people in Majengo.
          </p>
          <Link
            href="/donate"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition inline-flex items-center"
          >
            <Heart size={18} className="mr-2" />
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}
