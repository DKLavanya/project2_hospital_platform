import React from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeleMed - Advanced Hospital & Telemedicine Platform",
  description: "Experience professional medical consultations, AI symptom checks, patient records management, and real-time WebRTC video calls anywhere, anytime.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-content-layout">
          {children}
        </main>
        <footer className="footer-container">
          <div className="footer-inner">
            <p>&copy; {new Date().getFullYear()} TeleMed Platform. All rights reserved.</p>
            <p className="footer-disclaimer">For medical emergencies, please dial your local emergency services instantly.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
