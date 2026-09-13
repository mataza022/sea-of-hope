import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sea of Hope</h3>
            <p className="text-gray-400 text-sm">
              Support, treatment, and hope for people struggling with substance
              abuse and youth at risk of crime in Majengo, Nairobi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/get-help"
                  className="text-gray-400 hover:text-white"
                >
                  Get Help
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs/drop-in-centre"
                  className="text-gray-400 hover:text-white"
                >
                  Drop-in Centre
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/outreach"
                  className="text-gray-400 hover:text-white"
                >
                  Outreach Programme
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/vct"
                  className="text-gray-400 hover:text-white"
                >
                  VCT Services
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/counselling"
                  className="text-gray-400 hover:text-white"
                >
                  Counselling
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/mat"
                  className="text-gray-400 hover:text-white"
                >
                  MAT Programme
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                Majengo, Nairobi
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                0727 328 122
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                seaofhopeofficial@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Sea of Hope Organisation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
