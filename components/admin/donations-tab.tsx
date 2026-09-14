"use client";

import { Heart, Mail, Phone, DollarSign } from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  frequency: string;
  purpose: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  status: string;
  timestamp?: any;
}

interface DonationsTabProps {
  donations: Donation[];
}

export function DonationsTab({ donations }: DonationsTabProps) {
  if (donations.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">No donations yet.</p>
      </div>
    );
  }

  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div>
      {/* Total */}
      <div className="bg-gradient-to-r from-[#007eb4] to-[#005a8a] text-white p-6 rounded-xl shadow-lg mb-6">
        <p className="text-sm text-blue-100 mb-1">Total Donations Recorded</p>
        <p className="text-3xl font-bold">
          KSh {totalAmount.toLocaleString()}
        </p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-900">
                    {donation.donorName}
                  </span>
                  <span className="ml-3 text-lg font-bold text-[#007eb4]">
                    KSh {donation.amount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Mail size={14} className="mr-1" />
                    {donation.donorEmail}
                  </span>
                  {donation.donorPhone && (
                    <span className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {donation.donorPhone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize ${
                    donation.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {donation.status}
                </span>
                <span className="text-xs text-gray-400">
                  {donation.timestamp?.toDate?.().toLocaleDateString() || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
              <span>
                Frequency: <strong>{donation.frequency}</strong>
              </span>
              <span>
                Purpose: <strong className="capitalize">{donation.purpose}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
