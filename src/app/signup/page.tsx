"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Heart, Mail, Lock, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/80 flex items-center justify-center px-6 py-12">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/90 to-teal-500/90 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-light text-teal-700 mb-4">Account Created!</h1>
              <p className="text-teal-600 font-light mb-6">
                Welcome to your wellness journey! Please check your email to verify your account.
              </p>
              <div className="animate-pulse text-teal-500 font-light">
                Redirecting to login...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/80 flex items-center justify-center px-6 py-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-sky-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400/90 to-teal-500/90 rounded-3xl flex items-center justify-center shadow-2xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-light text-teal-700 tracking-wide mb-2">
            Create Account
          </h1>
          <p className="text-teal-600 font-light">
            Begin your wellness journey
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-light text-teal-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-teal-200/50 rounded-2xl focus:border-teal-400 focus:outline-none font-light text-teal-800 placeholder-teal-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-light text-teal-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-teal-200/50 rounded-2xl focus:border-teal-400 focus:outline-none font-light text-teal-800 placeholder-teal-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-2xl p-4 border border-teal-200/40">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <p className="text-sm text-teal-700 font-light">
                    Your data is encrypted and secure. We prioritize your privacy and mental health journey.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white py-4 rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-light shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-rose-50/80 border border-rose-200/60 rounded-2xl">
                  <p className="text-rose-700 text-sm font-light">{error}</p>
                </div>
              )}
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-teal-600 font-light">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-teal-700 hover:text-teal-800 font-medium transition-colors duration-300 underline decoration-teal-400/50 hover:decoration-teal-600/50"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}