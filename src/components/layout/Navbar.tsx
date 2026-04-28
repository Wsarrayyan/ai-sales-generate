"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FiZap, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <FiZap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">
              Sales<span className="text-brand-500">Forge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <Link href="/dashboard" className="btn-ghost">
                  Dashboard
                </Link>
                <Link href="/dashboard/new" className="btn-primary text-sm">
                  <FiZap className="w-3.5 h-3.5" />
                  Buat Sales Page
                </Link>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-dark-600">
                  <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white/60" />
                  </div>
                  <span className="text-sm text-white/70">{session.user?.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-ghost text-red-400 hover:text-red-300"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-ghost">
                  Masuk
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm">
                  Mulai Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden btn-ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-dark-700 space-y-2 animate-fade-in">
            {session ? (
              <>
                <Link href="/dashboard" className="block btn-ghost w-full justify-start">Dashboard</Link>
                <Link href="/dashboard/new" className="block btn-primary w-full justify-center">Buat Sales Page</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left btn-ghost text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block btn-ghost">Masuk</Link>
                <Link href="/auth/register" className="block btn-primary justify-center">Mulai Gratis</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
