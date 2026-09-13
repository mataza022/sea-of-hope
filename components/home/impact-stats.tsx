"use client";

import { useEffect, useState } from "react";
import { Users, MapPin, Syringe, UtensilsCrossed } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export function ImpactStats() {
  const [stats, setStats] = useState({
    clientsServed: 0,
    outreachVisits: 0,
    nspDistributed: 0,
    mealsServed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "impact_metrics"));
        const data: any = {};
        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data().value;
        });
        setStats({
          clientsServed: data.clients_served || 0,
          outreachVisits: data.outreach_visits || 0,
          nspDistributed: data.nsp_distributed || 0,
          mealsServed: data.meals_served || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: "Clients Served", value: stats.clientsServed, icon: Users },
    { label: "Outreach Visits", value: stats.outreachVisits, icon: MapPin },
    { label: "NSP Distributed", value: stats.nspDistributed, icon: Syringe },
    { label: "Meals Served", value: stats.mealsServed, icon: UtensilsCrossed },
  ];

  return (
    <section className="py-16 bg-[#005a8a] text-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Our Impact in the Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon size={32} className="mx-auto mb-2 text-white" />
                <div className="text-3xl font-bold">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
