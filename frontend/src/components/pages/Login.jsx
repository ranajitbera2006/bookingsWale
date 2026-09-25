import React, { useState } from "react";
import { Building2, Mail, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden animate-in fade-in duration-200">
        <div className="p-8 pb-6 text-center border-b border-slate-100">
          <div className="w-14 h-14  text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-200">
            <img src="/appLogo.png" alt="" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Bookings<span className="text-indigo-600">Wale</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Admin & Broker Portal Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@bookingswale.in"
                className="w-full text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-md transition duration-150 cursor-pointer disabled:bg-slate-300"
          >
            {loading ? "Authenticating..." : "Sign In to Panel"}
          </button>
        </form>

        <div className="p-5 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Demo Presets
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail("admin@bookingswale.in");
                setPassword("admin1234");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-indigo-600 rounded-lg text-xs font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("ranajit@bookingswale.in");
                setPassword("coderRB");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-indigo-600 rounded-lg text-xs font-semibold"
            >
              <UserCheck className="w-3.5 h-3.5" /> Broker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
