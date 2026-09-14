"use client";

import { Phone, MapPin, AlertTriangle } from "lucide-react";

interface HelpRequest {
  id: string;
  name?: string;
  age: string;
  substance: string;
  urgency: string;
  phone: string;
  location?: string;
  consent: boolean;
  status?: string;
  timestamp?: any;
}

interface RequestsTabProps {
  requests: HelpRequest[];
}

export function RequestsTab({ requests }: RequestsTabProps) {
  if (requests.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm text-center">
        <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">No help requests yet.</p>
      </div>
    );
  }

  const urgencyColor = (urgency: string) => {
    if (urgency === "emergency") return "bg-red-100 text-red-700 border-red-200";
    if (urgency === "urgent") return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <div
          key={req.id}
          className={`bg-white p-6 rounded-xl shadow-sm border-2 ${
            req.urgency === "emergency"
              ? "border-red-200"
              : req.urgency === "urgent"
              ? "border-orange-200"
              : "border-gray-100"
          } hover:shadow-md transition`}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center mb-1">
                <span className="font-bold text-gray-900">
                  {req.name || "Anonymous"}
                </span>
                <span className="ml-2 text-sm text-gray-500">Age: {req.age}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="flex items-center">
                  <Phone size={14} className="mr-1" />
                  {req.phone}
                </span>
                {req.location && (
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {req.location}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-full border capitalize ${urgencyColor(
                  req.urgency
                )}`}
              >
                {req.urgency === "emergency" && "🚨 "}
                {req.urgency}
              </span>
              {req.status === "new" && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-3 pt-3 border-t border-gray-100">
            <span className="text-gray-600">
              Substance: <strong className="text-gray-900">{req.substance}</strong>
            </span>
            <span className="text-gray-600">
              Consent: {req.consent ? "✅ Yes" : "No"}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {req.timestamp?.toDate?.().toLocaleDateString() || "N/A"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
