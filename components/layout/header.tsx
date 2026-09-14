"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  Heart,
  Phone,
} from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "sw">("en");
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [youthExpanded, setYouthExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const t = {
    en: {
      home: "Home",
      about: "About Us",
      getHelp: "Get Help",
      donate: "Donate",
      contact: "Contact",
      services: "Services",
      youth: "Youth",
      dropInCentre: "Drop-in Centre",
      outreach: "Outreach Programme",
      vct: "VCT Services",
      counselling: "Counselling",
      mat: "MAT Programme",
      food: "Food Programme",
      medical: "Medical Referral",
      crimePrevention: "Crime Prevention",
      programsMentorship: "Programs & Mentorship",
      familyCommunity: "Family & Community",
      search: "Search our services...",
      emergency: "Emergency",
    },
    sw: {
      home: "Nyumbani",
      about: "Kuhusu Sisi",
      getHelp: "Pata Msaada",
      donate: "Changia",
      contact: "Wasiliana",
      services: "Huduma",
      youth: "Vijana",
      dropInCentre: "Kituo cha Mapokezi",
      outreach: "Programu ya Uhamasishaji",
      vct: "Huduma za VCT",
      counselling: "Ushauri Nasaha",
      mat: "Programu ya MAT",
      food: "Programu ya Chakula",
      medical: "Rufaa ya Hospitali",
      crimePrevention: "Kuzuia Uhalifu",
      programsMentorship: "Programu na Ushauri",
      familyCommunity: "Familia na Jamii",
      search: "Tafuta huduma zetu...",
      emergency: "Dharura",
    },
  }[lang];

  const serviceLinks = [
    { href: "/programs/drop-in-centre", label: t.dropInCentre },
    { href: "/programs/outreach", label: t.outreach },
    { href: "/programs/vct", label: t.vct },
    { href: "/programs/counselling", label: t.counselling },
    { href: "/programs/mat", label: t.mat },
    { href: "/programs/food", label: t.food },
    { href: "/programs/medical-referral", label: t.medical },
  ];

  const youthLinks = [
    { href: "/youth/crime-prevention", label: t.crimePrevention },
    { href: "/youth/programs-mentorship", label: t.programsMentorship },
    { href: "/youth/family-community", label: t.familyCommunity },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* Top Bar - Language & Search */}
        <div className="bg-[#005a8a] text-white">
          <div className="container flex justify-between items-center h-10">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center text-sm hover:text-gray-200"
              >
                <Globe size={14} className="mr-1" />
                <span>{lang === "en" ? "English" : "Kiswahili"}</span>
                <ChevronDown size={14} className="ml-1" />
              </button>
              {languageOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-gray-900 rounded-md shadow-lg py-2 w-40 z-50">
                  <button
                    onClick={() => {
                      setLang("en");
                      setLanguageOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLang("sw");
                      setLanguageOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Kiswahili
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-sm hover:text-gray-200"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <Link
                href="/donate"
                className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-300 transition flex items-center"
              >
                <Heart size={14} className="mr-1" />
                {t.donate}
              </Link>
            </div>
          </div>

          {searchOpen && (
            <div className="bg-white py-3 px-4 border-b">
              <div className="container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const query = (
                      document.getElementById("search-input") as HTMLInputElement
                    ).value;
                    window.location.href = `/search?q=${encodeURIComponent(
                      query
                    )}`;
                  }}
                  className="flex gap-2"
                >
                  <input
                    id="search-input"
                    type="search"
                    placeholder={t.search}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-black placeholder-gray-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-[#007eb4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a8a] transition"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Main Header */}
        <div className="container">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Sea of Hope Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-bold text-xl md:text-2xl text-[#007eb4]">
                  Sea of Hope
                </span>
                <span className="block text-xs text-gray-500 -mt-1">
                  Organisation
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent hover:border-[#007eb4] transition"
              >
                {t.home}
              </Link>

              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent group-hover:border-[#007eb4] transition flex items-center">
                  {t.services}
                  <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-2 w-64 hidden group-hover:block">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent group-hover:border-[#007eb4] transition flex items-center">
                  {t.youth}
                  <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-2 w-64 hidden group-hover:block">
                  {youthLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent hover:border-[#007eb4] transition"
              >
                {t.about}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent hover:border-[#007eb4] transition"
              >
                {t.contact}
              </Link>
            </nav>

            {/* Animated Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#007eb4] transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-7 h-6">
                <span
                  className={`absolute left-0 w-7 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "top-3 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 w-7 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0 translate-x-3" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-7 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "top-3 -rotate-45" : "top-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Slides from RIGHT */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in Panel - From RIGHT */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b bg-[#005a8a] text-white">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Sea of Hope Logo"
                className="w-10 h-10 object-contain rounded-full bg-white"
              />
              <div>
                <span className="font-bold text-lg block">Sea of Hope</span>
                <span className="text-xs text-gray-200">Organisation</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto py-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4] ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "50ms" : "0ms" }}
            >
              {t.home}
            </Link>

            <div
              className={`transition-all duration-300 ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "100ms" : "0ms" }}
            >
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex items-center justify-between px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4]"
              >
                {t.services}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    servicesExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                  servicesExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {serviceLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-10 py-3 text-gray-600 hover:text-[#007eb4] text-sm transition-colors"
                    style={{
                      transitionDelay: servicesExpanded
                        ? `${index * 30}ms`
                        : "0ms",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`transition-all duration-300 ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "150ms" : "0ms" }}
            >
              <button
                onClick={() => setYouthExpanded(!youthExpanded)}
                className="w-full flex items-center justify-between px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4]"
              >
                {t.youth}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    youthExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                  youthExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {youthLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-10 py-3 text-gray-600 hover:text-[#007eb4] text-sm transition-colors"
                    style={{
                      transitionDelay: youthExpanded ? `${index * 30}ms` : "0ms",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4] ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "200ms" : "0ms" }}
            >
              {t.about}
            </Link>

            <Link
              href="/get-help"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4] ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "250ms" : "0ms" }}
            >
              {t.getHelp}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-6 py-4 text-gray-700 font-medium hover:bg-blue-50 hover:text-[#007eb4] transition-all duration-300 border-l-4 border-transparent hover:border-[#007eb4] ${
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? "300ms" : "0ms" }}
            >
              {t.contact}
            </Link>
          </div>

          <div
            className={`p-4 border-t bg-gray-50 space-y-2 transition-all duration-300 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "350ms" : "0ms" }}
          >
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition shadow-md"
            >
              <Heart size={16} className="mr-2" />
              {t.donate}
            </Link>
            <a
              href="tel:+254727328122"
              className="flex items-center justify-center bg-[#005a8a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#007eb4] transition shadow-md"
            >
              <Phone size={16} className="mr-2" />
              {t.emergency}: 0727 328 122
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
