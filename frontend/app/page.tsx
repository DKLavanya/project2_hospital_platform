"use client";

import React from "react";
import Link from "next/link";
import { Video, Brain, Stethoscope, FileText, CreditCard, Calendar, UserCheck, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const modules = [
    {
      icon: <Calendar className="module-icon color-1" />,
      title: "Appointment Management",
      desc: "Schedule real-time video consults with specialized doctors, choose slots, and track queues."
    },
    {
      icon: <UserCheck className="module-icon color-2" />,
      title: "Electronic Health Records",
      desc: "Secure storage of clinical notes, vitals tracker, consultation history, and allergy logs."
    },
    {
      icon: <Video className="module-icon color-3" />,
      title: "Video Consultations",
      desc: "High-definition, low-latency peer-to-peer WebRTC video calling with in-room chat."
    },
    {
      icon: <FileText className="module-icon color-4" />,
      title: "Digital Prescription System",
      desc: "Doctors can write and sign structured electronic prescriptions instantly sent to patients."
    },
    {
      icon: <Brain className="module-icon color-5" />,
      title: "AI Symptom Analysis",
      desc: "Smart diagnostic assistance matching symptoms, suggesting probabilities, and rating urgency."
    },
    {
      icon: <CreditCard className="module-icon color-6" />,
      title: "Billing & Invoices",
      desc: "Automatic invoice generation, Stripe-ready checkout simulations, and payment history tracker."
    }
  ];

  return (
    <div className="home-container animate-slide-up">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Intelligent Digital Care System</span>
        </div>
        <h1 className="hero-title">
          The Future of <span className="gradient-txt">Telehealth</span> is Here.
        </h1>
        <p className="hero-subtitle">
          Connect with specialized medical practitioners, consult over secure high-definition video, receive digital prescriptions, and run AI-assisted health assessments instantly.
        </p>
        <div className="hero-actions">
          <Link href="/symptoms" className="btn btn-primary btn-lg">
            Try AI Symptom Checker
            <ArrowRight size={18} />
          </Link>
          <Link href="/auth" className="btn btn-secondary btn-lg">
            Access Patient/Doctor Portal
          </Link>
        </div>
      </section>

      {/* Grid of Modules */}
      <section className="modules-section">
        <h2 className="section-title">Core Platform Modules</h2>
        <p className="section-subtitle">A fully integrated environment covering every stage of the telemedicine pipeline.</p>
        
        <div className="modules-grid">
          {modules.map((m, idx) => (
            <div key={idx} className="glass-panel module-card">
              <div className="module-icon-container">
                {m.icon}
              </div>
              <h3 className="module-title">{m.title}</h3>
              <p className="module-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner / Info */}
      <section className="info-banner glass-panel">
        <div className="banner-content">
          <ShieldAlert className="banner-icon" />
          <div>
            <h4 className="banner-title">HIPAA Compliant & WebRTC Secured</h4>
            <p className="banner-text">All consultation streams are peer-to-peer and encrypted. Patient database entries are heavily guarded using secure JSON Web Token authorization protocols.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }
        .hero-section {
          text-align: center;
          max-width: 800px;
          margin: 60px auto 20px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .hero-badge {
          background: var(--primary-glow);
          border: 1px solid var(--border-glow);
          color: var(--primary);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sparkle-icon {
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .gradient-txt {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.25rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-top: 12px;
        }
        .btn-lg {
          padding: 14px 28px;
          font-size: 1.05rem;
        }
        
        /* Modules Grid */
        .modules-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .section-title {
          font-size: 2.25rem;
          text-align: center;
        }
        .section-subtitle {
          color: var(--text-muted);
          text-align: center;
          max-width: 600px;
          font-size: 1.05rem;
        }
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          width: 100%;
          margin-top: 32px;
        }
        .module-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          transition: var(--transition-normal);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .module-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-glow);
          box-shadow: var(--shadow-glow);
        }
        .module-icon-container {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .module-icon {
          width: 26px;
          height: 26px;
        }
        .color-1 { color: #f43f5e; } /* Rose */
        .color-2 { color: #3b82f6; } /* Blue */
        .color-3 { color: #10b981; } /* Emerald */
        .color-4 { color: #8b5cf6; } /* Violet */
        .color-5 { color: #f59e0b; } /* Amber */
        .color-6 { color: #06b6d4; } /* Cyan */
        
        .module-title {
          font-size: 1.35rem;
          font-weight: 700;
        }
        .module-desc {
          color: var(--text-muted);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        /* Banner info */
        .info-banner {
          background: rgba(239, 68, 68, 0.03);
          border-color: rgba(239, 68, 68, 0.15);
          padding: 24px 32px;
          border-radius: var(--radius-lg);
        }
        .banner-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .banner-icon {
          color: var(--danger);
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }
        .banner-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 4px;
        }
        .banner-text {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.75rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .modules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
