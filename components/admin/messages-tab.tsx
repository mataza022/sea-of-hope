"use client";

import { Mail, Phone, User, Calendar } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read?: boolean;
  timestamp?: any;
}

interface MessagesTabProps {
  messages: ContactMessage[];
}

export function MessagesTab({ messages }: MessagesTabProps) {
  if (messages.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm text-center">
        <Mail size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">No contact messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center mb-1">
                <User size={16} className="text-[#007eb4] mr-2" />
                <span className="font-bold text-gray-900">{msg.name}</span>
                <span className="ml-3 text-xs bg-blue-50 text-[#007eb4] px-2 py-1 rounded-full capitalize">
                  {msg.subject}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="flex items-center">
                  <Mail size={14} className="mr-1" />
                  {msg.email}
                </span>
                {msg.phone && (
                  <span className="flex items-center">
                    <Phone size={14} className="mr-1" />
                    {msg.phone}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              <Calendar size={12} className="inline mr-1" />
              {msg.timestamp?.toDate?.().toLocaleDateString() || "N/A"}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
