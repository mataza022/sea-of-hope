"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SearchResult {
  title: string;
  description: string;
  link: string;
}

const searchData: SearchResult[] = [
  {
    title: "Drop-in Centre",
    description: "Safe space with food, counselling, and referrals.",
    link: "/programs/drop-in-centre",
  },
  {
    title: "Outreach Programme",
    description: "Daily visits to the dens — NSP, condoms, health talks.",
    link: "/programs/outreach",
  },
  {
    title: "VCT Services",
    description: "Confidential HIV testing and counselling.",
    link: "/programs/vct",
  },
  {
    title: "Counselling Services",
    description: "One-on-one, family, group, and support groups.",
    link: "/programs/counselling",
  },
  {
    title: "MAT Programme",
    description: "Medication-Assisted Treatment for recovery.",
    link: "/programs/mat",
  },
  {
    title: "Food Programme",
    description: "Daily nutritious meals for clients.",
    link: "/programs/food",
  },
  {
    title: "Medical Referral",
    description: "Hospital partnerships for treatment.",
    link: "/programs/medical-referral",
  },
  {
    title: "Youth Crime Prevention",
    description: "Rescuing youth from gangs and crime.",
    link: "/youth/crime-prevention",
  },
  {
    title: "About Us",
    description: "Learn about Sea of Hope Organisation.",
    link: "/about",
  },
  {
    title: "Get Help",
    description: "Confidential support for substance abuse.",
    link: "/get-help",
  },
  {
    title: "Donate",
    description: "Support our work with a donation.",
    link: "/donate",
  },
  {
    title: "Contact",
    description: "Get in touch with our team.",
    link: "/contact",
  },
];

function SearchComponent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <div className="relative mb-8">
          <input
            type="search"
            placeholder="Search our services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007eb4] text-black placeholder-gray-500"
            autoFocus
          />
        </div>

        {query.trim() === "" ? (
          <p className="text-gray-600">
            Type to search our services and pages.
          </p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No results found for "{query}".</p>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <Link
                key={result.link}
                href={result.link}
                className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-[#007eb4] mb-2">
                  {result.title}
                </h2>
                <p className="text-gray-600">{result.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
