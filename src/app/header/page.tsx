"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, User, UserPlus, LogOut } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // Fetch session on mount
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const linkBase =
    "transition-colors font-light relative group px-2 py-1 rounded-lg";
  const activeStyle =
    "text-white bg-gradient-to-r from-teal-400 to-cyan-500 shadow-md";
  const inactiveStyle =
    "text-teal-600 hover:text-teal-700 hover:bg-teal-50/50";

  const navLinks = [
    { href: "/therabot", label: "Chat" },
    { href: "/wellness", label: "Wellness" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <header className="bg-white backdrop-blur-md border-b border-teal-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-teal-400/90 to-teal-500/90 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-light text-teal-700 tracking-wide group-hover:text-teal-600 transition-colors duration-300">
              TherapyWellnessHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkBase} ${
                  pathname === link.href ? activeStyle : inactiveStyle
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-teal-700 font-light flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 hover:text-red-600 flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${linkBase} flex items-center space-x-2 ${
                    pathname === "/login" ? activeStyle : inactiveStyle
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/signup"
                  className={`${linkBase} flex items-center space-x-2 ${
                    pathname === "/signup" ? activeStyle : inactiveStyle
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Signup</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
