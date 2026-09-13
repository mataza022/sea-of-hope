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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top Bar - Language & Search */}
      <div className="bg-[#005a8a] text-white">
        <div className="container flex justify-between items-center h-10">
          {/* Language Selector */}
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

          {/* Search & Donate */}
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

        {/* Search Bar */}
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
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-[#007eb4] font-medium text-sm border-b-2 border-transparent hover:border-[#007eb4] transition"
            >
              {t.home}
            </Link>

            {/* Services Dropdown */}
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

            {/* Youth Dropdown */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-700 p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="container py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
            >
              {t.home}
            </Link>

            {/* Services Accordion */}
            <div className="border-b border-gray-100">
              <button
                className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg flex justify-between items-center"
                onClick={() =>
                  document
                    .getElementById("services-mobile")
                    ?.classList.toggle("hidden")
                }
              >
                {t.services}
                <ChevronDown size={16} />
              </button>
              <div id="services-mobile" className="hidden pl-4 pb-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-[#007eb4] text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Youth Accordion */}
            <div className="border-b border-gray-100">
              <button
                className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg flex justify-between items-center"
                onClick={() =>
                  document
                    .getElementById("youth-mobile")
                    ?.classList.toggle("hidden")
                }
              >
                {t.youth}
                <ChevronDown size={16} />
              </button>
              <div id="youth-mobile" className="hidden pl-4 pb-2">
                {youthLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-[#007eb4] text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
            >
              {t.about}
            </Link>
            <Link
              href="/get-help"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
            >
              {t.getHelp}
            </Link>
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
            >
              {t.donate}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
            >
              {t.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
