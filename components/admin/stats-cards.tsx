"use client";

import { Mail, MessageSquare, Heart, AlertTriangle } from "lucide-react";

interface StatsCardsProps {
  messages: number;
  requests: number;
  donations: number;
  urgentRequests: number;
}

export function StatsCards({
  messages,
  requests,
  donations,
  urgentRequests,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Contact Messages",
      value: messages,
      icon: Mail,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Help Requests",
      value: requests,
      icon: MessageSquare,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Urgent Requests",
      value: urgentRequests,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
    },
    {
      label: "Donations",
      value: donations,
      icon: Heart,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <div
              className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
            >
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
