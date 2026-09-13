import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sea of Hope Organisation | Majengo, Nairobi",
    template: "%s | Sea of Hope",
  },
  description:
    "Sea of Hope provides support for people struggling with substance abuse and rescues youth from crime in Majengo, Nairobi, Kenya.",
  keywords: [
    "Sea of Hope",
    "Majengo",
    "Nairobi",
    "drug rehabilitation",
    "substance abuse",
    "youth crime prevention",
    "drop-in centre",
    "VCT",
    "counselling",
  ],
  openGraph: {
    title: "Sea of Hope Organisation",
    description: "Hope for Youth. Hope for Recovery.",
    url: "https://seaofhope.org",
    siteName: "Sea of Hope Organisation",
    locale: "en_KE",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
