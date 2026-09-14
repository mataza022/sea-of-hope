"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "./auth-provider";
import { StatsCards } from "./stats-cards";
import { MessagesTab } from "./messages-tab";
import { RequestsTab } from "./requests-tab";
import { DonationsTab } from "./donations-tab";
import { LogOut, Mail, MessageSquare, Heart, RefreshCw } from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"messages" | "requests" | "donations">("requests");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [messagesSnap, requestsSnap, donationsSnap] = await Promise.all([
        getDocs(query(collection(db, "contact_messages"), orderBy("timestamp", "desc"))),
        getDocs(query(collection(db, "help_requests"), orderBy("timestamp", "desc"))),
        getDocs(query(collection(db, "donations"), orderBy("timestamp", "desc"))),
      ]);

      setMessages(
        messagesSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setRequests(
        requestsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setDonations(
        donationsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const urgentRequests = requests.filter((r) => r.urgency === "emergency").length;

  const tabs = [
    {
      id: "requests" as const,
      label: "Help Requests",
      count: requests.length,
      icon: MessageSquare,
    },
    {
      id: "messages" as const,
      label: "Messages",
      count: messages.length,
      icon: Mail,
    },
    {
      id: "donations" as const,
      label: "Donations",
      count: donations.length,
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Signed in as {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-[#007eb4] hover:bg-blue-50 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="mb-8">
          <StatsCards
            messages={messages.length}
            requests={requests.length}
            donations={donations.length}
            urgentRequests={urgentRequests}
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-[#007eb4] text-[#007eb4]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-[#007eb4] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <>
            {activeTab === "messages" && <MessagesTab messages={messages} />}
            {activeTab === "requests" && <RequestsTab requests={requests} />}
            {activeTab === "donations" && <DonationsTab donations={donations} />}
          </>
        )}
      </main>
    </div>
  );
}
