import Link from "next/link";
import { Heart, PhoneCall } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Sea of Hope Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005a8a] via-[#007eb4]/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative container h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl">
          <p className="text-lg md:text-xl mb-4 font-medium">
            Majengo, Nairobi, Kenya
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Hauko Peke Yako.
            <br />
            You Are Not Alone.
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-100">
            We provide support for people struggling with substance abuse and
            rescue youth from crime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-help"
              className="bg-[#007eb4] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#005a8a] transition shadow-lg inline-flex items-center justify-center"
            >
              Get Help Now
            </Link>
            <Link
              href="/donate"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-flex items-center justify-center"
            >
              <Heart size={18} className="mr-2" />
              Donate
            </Link>
          </div>

          {/* Emergency Phone */}
          <div className="mt-8">
            <a
              href="tel:+254727328122"
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
            >
              <PhoneCall size={18} className="mr-2" />
              0727 328 122
            </a>
          </div>
        </div>
      </div>

      {/* Credits Button */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-black/50 text-white text-xs px-3 py-1 rounded">
          © Sea of Hope
        </button>
      </div>
    </section>
  );
}