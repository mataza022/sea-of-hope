import Link from "next/link";
import { Heart, PhoneCall, MessageCircle, MessageSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[550px] md:h-[700px] overflow-hidden">
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
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
        <div className="max-w-4xl">
          <p className="text-lg md:text-xl mb-4 font-medium">
            Majengo, Nairobi, Kenya
          </p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Hauko Peke Yako.
            <br />
            You Are Not Alone.
          </h1>

          <p className="text-lg md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            We provide support for people struggling with substance abuse and
            rescue youth from crime.
          </p>

          {/* Page Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/get-help"
              className="bg-[#007eb4] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#005a8a] transition shadow-lg"
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

          {/* Need Help Now - Blue Bar */}
          <div className="w-full max-w-2xl mx-auto bg-[#005a8a]/90 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg border border-white/20">
            <p className="text-xs uppercase tracking-widest text-gray-200 mb-3 font-semibold">
              Need Help Now?
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:+254727328122"
                className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center"
              >
                <PhoneCall size={14} className="mr-1" />
                Call
              </a>
              <a
                href="https://wa.me/254727328122"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center"
              >
                <MessageCircle size={14} className="mr-1" />
                WhatsApp
              </a>
              <a
                href="sms:+254727328122"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center"
              >
                <MessageSquare size={14} className="mr-1" />
                Text
              </a>
            </div>
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
