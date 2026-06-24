"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Activity, User, LogOut, ShieldAlert, Heart, Calendar } from "lucide-react";
import { apiRequest } from "../utils/api";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("telemed_token");
    if (!token) {
      setCurrentUser(null);
      return;
    }
    try {
      const user = await apiRequest("/auth/me");
      setCurrentUser(user);
    } catch (err) {
      console.error("Failed to load user profile, token might be expired.");
      localStorage.removeItem("telemed_token");
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // Listen to changes in localStorage or custom trigger
    window.addEventListener("auth_changed", fetchCurrentUser);
    return () => {
      window.removeEventListener("auth_changed", fetchCurrentUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("telemed_token");
    setCurrentUser(null);
    window.dispatchEvent(new Event("auth_changed"));
    router.push("/");
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <Link href="/" className="logo-section">
          <div className="logo-icon-wrapper">
            <Activity className="logo-icon" />
          </div>
          <span className="logo-text">Tele<span className="gradient-txt">Med</span></span>
        </Link>

        <nav className="nav-links">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Overview
          </Link>
          <Link href="/symptoms" className={`nav-link ${pathname === "/symptoms" ? "active" : ""}`}>
            AI Symptom Checker
          </Link>
          <Link href="/patient" className={`nav-link ${pathname.startsWith("/patient") ? "active" : ""}`}>
            Patient Portal
          </Link>
          <Link href="/doctor" className={`nav-link ${pathname.startsWith("/doctor") ? "active" : ""}`}>
            Doctor Portal
          </Link>
        </nav>

        <div className="auth-section">
          {currentUser ? (
            <div className="user-profile-menu">
              <div className="user-avatar-info">
                <div className="avatar-placeholder">
                  {currentUser.name[0].toUpperCase()}
                </div>
                <div className="avatar-details">
                  <span className="avatar-name">{currentUser.name}</span>
                  <span className="avatar-role">
                    {currentUser.role === "doctor" ? `${currentUser.specialization || "Physician"}` : "Patient"}
                  </span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-logout" title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/auth" className="btn btn-primary btn-auth-nav">
              <User size={16} />
              Sign In
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(11, 15, 25, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          height: 72px;
          display: flex;
          align-items: center;
        }
        .navbar-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-icon-wrapper {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px var(--primary-glow);
        }
        .logo-icon {
          color: white;
          width: 20px;
          height: 20px;
        }
        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }
        .gradient-txt {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition-fast);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
        }
        .nav-link:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.03);
        }
        .nav-link.active {
          color: var(--secondary);
          background: var(--secondary-glow);
        }
        .auth-section {
          display: flex;
          align-items: center;
        }
        .btn-auth-nav {
          padding: 8px 16px;
          font-size: 0.9rem;
        }
        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          border-radius: var(--radius-md);
        }
        .user-avatar-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar-placeholder {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, var(--secondary), var(--primary));
          color: white;
          font-weight: 700;
          font-family: var(--font-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .avatar-details {
          display: flex;
          flex-direction: column;
        }
        .avatar-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .avatar-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-logout {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .btn-logout:hover {
          color: var(--danger);
        }
      `}</style>
    </header>
  );
}
