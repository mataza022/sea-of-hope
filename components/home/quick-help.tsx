import { Phone, MessageCircle, MessageSquare } from "lucide-react";

export function QuickHelp() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200">
          <h2 className="text-2xl font-bold text-center text-yellow-800 mb-4">
            Need Help Now?
          </h2>
          <p className="text-center text-gray-700 mb-6">
            If you or someone you know is in crisis, reach out immediately.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="tel:+254727328122"
              className="bg-red-600 text-white p-4 rounded-lg text-center font-bold hover:bg-red-700 transition flex items-center justify-center"
            >
              <Phone size={18} className="mr-2" />
              Call Us
            </a>
            <a
              href="https://wa.me/254727328122"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white p-4 rounded-lg text-center font-bold hover:bg-green-700 transition flex items-center justify-center"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </a>
            <a
              href="sms:+254727328122"
              className="bg-blue-600 text-white p-4 rounded-lg text-center font-bold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <MessageSquare size={18} className="mr-2" />
              Text Us
            </a>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Confidential. Anonymous. No judgment.
          </p>
        </div>
      </div>
    </section>
  );
}