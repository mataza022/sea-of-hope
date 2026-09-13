"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254727328122?text=Habari%2C%20ninahitaji%20msaada"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
