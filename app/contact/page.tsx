"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, this will connect to Firebase
    setSubmitted(true);
  };

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
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              We're here to help. Reach out to us with any questions, concerns,
              or to get involved in our work.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-[#007eb4]/10 p-4 rounded-full inline-flex mb-4">
              <Phone size={24} className="text-[#007eb4]" />
            </div>
            <h3 className="font-bold mb-2">Call Us</h3>
            <a
              href="tel:+254727328122"
              className="text-gray-600 hover:text-[#007eb4] transition"
            >
              0727 328 122
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-[#007eb4]/10 p-4 rounded-full inline-flex mb-4">
              <Mail size={24} className="text-[#007eb4]" />
            </div>
            <h3 className="font-bold mb-2">Email Us</h3>
            <a
              href="mailto:seaofhopeofficial@gmail.com"
              className="text-gray-600 hover:text-[#007eb4] transition"
            >
              seaofhopeofficial@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-[#007eb4]/10 p-4 rounded-full inline-flex mb-4">
              <MapPin size={24} className="text-[#007eb4]" />
            </div>
            <h3 className="font-bold mb-2">Visit Us</h3>
            <p className="text-gray-600">Majengo, Nairobi, Kenya</p>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                <div className="text-5xl mb-4">
                  <Send size={48} className="mx-auto text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    >
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="help">Request Help</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="donate">Donations</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#007eb4] text-white px-8 py-4 rounded-lg font-bold w-full hover:bg-[#005a8a] transition"
                >
                  <Send size={18} className="inline mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map & Hours */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Our Location</h2>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8432!2d36.827!3d-1.286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d0d53c2e77%3A0x2c0a3c5e94d3f8d1!2sMajengo%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sea of Hope Location - Majengo, Nairobi"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-[#007eb4]" />
                Office Hours
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-bold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-bold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-bold">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#005a8a] text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Quick Contact</h2>
              <div className="space-y-3">
                <a
                  href="tel:+254727328122"
                  className="flex items-center hover:text-gray-200 transition"
                >
                  <Phone size={18} className="mr-3" />
                  Call: 0727 328 122
                </a>
                <a
                  href="https://wa.me/254727328122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-gray-200 transition"
                >
                  <MessageCircle size={18} className="mr-3" />
                  WhatsApp Us
                </a>
                <a
                  href="mailto:seaofhopeofficial@gmail.com"
                  className="flex items-center hover:text-gray-200 transition"
                >
                  <Mail size={18} className="mr-3" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
