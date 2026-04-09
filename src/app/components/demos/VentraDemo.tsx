"use client";

import { useState } from "react";
import { UserCheck, LogOut, Clock, CheckCircle2, ChevronRight, Users } from "lucide-react";

type Screen = "kiosk" | "signin-step1" | "signin-step2" | "signin-step3" | "signin-step4" | "signin-done" | "reception";

interface Visitor {
  id: number;
  name: string;
  company: string;
  host: string;
  type: string;
  time: string;
  initials: string;
}

const visitorTypes = [
  { label: "Parent / Guardian",       emoji: "👨‍👩‍👧" },
  { label: "Contractor / Tradesperson", emoji: "🔧" },
  { label: "Official / Inspector",    emoji: "📋" },
  { label: "Supplier / Delivery",     emoji: "📦" },
  { label: "Other",                   emoji: "👤" },
];

const initialVisitors: Visitor[] = [
  { id: 1, name: "David Thornton",  company: "Apex Contractors",  host: "Mrs. Clarke",  type: "Contractor", time: "09:15", initials: "DT" },
  { id: 2, name: "Rachel Nguyen",   company: "Ofsted",            host: "Head Teacher", type: "Inspector",  time: "10:02", initials: "RN" },
  { id: 3, name: "Marcus Webb",     company: "Office Supplies Ltd",host: "Admin Team",  type: "Delivery",   time: "11:30", initials: "MW" },
];

export default function VentraDemo() {
  const [screen, setScreen] = useState<Screen>("kiosk");
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);

  // Sign-in form state
  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [company, setCompany]       = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [host, setHost]             = useState("");
  const [agreed, setAgreed]         = useState(false);

  const fullName = `${firstName} ${lastName}`.trim();
  const initials = [firstName[0], lastName[0]].filter(Boolean).join("").toUpperCase() || "?";

  const handleSignInDone = () => {
    const newVisitor: Visitor = {
      id: Date.now(),
      name: fullName || "New Visitor",
      company: company || "—",
      host: host || "Reception",
      type: selectedType || "Other",
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      initials,
    };
    setVisitors((prev) => [...prev, newVisitor]);
    setScreen("signin-done");
  };

  const handleCheckout = (id: number) => {
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  const resetForm = () => {
    setFirstName(""); setLastName(""); setCompany("");
    setSelectedType(""); setHost(""); setAgreed(false);
    setScreen("kiosk");
  };

  // ── KIOSK HOME ──
  if (screen === "kiosk") {
    return (
      <div
        className="min-h-[560px] flex flex-col items-center justify-center gap-8 px-8"
        style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 50%, #047857 100%)" }}
      >
        <div className="text-center">
          <p className="text-emerald-300 text-sm font-medium tracking-widest uppercase mb-2">Welcome to</p>
          <h1 className="text-white text-4xl font-extrabold tracking-tight">GSG Technologies</h1>
          <p className="text-emerald-200 mt-2 text-base">Please sign in or sign out below</p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={() => setScreen("signin-step1")}
            className="flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-10 py-7 transition-all duration-200 group"
          >
            <UserCheck size={36} className="text-emerald-300 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="font-bold text-lg">Sign In</p>
              <p className="text-emerald-300 text-sm">Register your arrival</p>
            </div>
          </button>

          <button
            onClick={() => setScreen("reception")}
            className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 text-white/80 rounded-2xl px-10 py-7 transition-all duration-200 group"
          >
            <LogOut size={36} className="text-emerald-400/70 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="font-bold text-lg">Sign Out</p>
              <p className="text-emerald-400/70 text-sm">Record your departure</p>
            </div>
          </button>
        </div>

        <p className="text-emerald-400/60 text-sm animate-pulse">Touch the screen to begin</p>

        <button
          onClick={() => setScreen("reception")}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 text-xs transition-colors"
        >
          Reception View →
        </button>
      </div>
    );
  }

  // ── SIGN-IN STEP 1: Details ──
  if (screen === "signin-step1") {
    return (
      <div className="min-h-[560px] flex flex-col" style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 60%, #047857 100%)" }}>
        <div className="px-8 py-5 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Ventra</span>
          <span className="text-emerald-300 text-sm">Step 1 of 4 — Your Details</span>
        </div>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Tell us about yourself</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">First Name *</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Last Name *</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Company / Organisation</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
              </div>
              <button
                onClick={() => setScreen("signin-step2")}
                disabled={!firstName || !lastName}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Next <ChevronRight size={16} />
              </button>
              <button onClick={resetForm} className="w-full text-sm text-gray-400 hover:text-gray-600">← Back to home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIGN-IN STEP 2: Visitor type ──
  if (screen === "signin-step2") {
    return (
      <div className="min-h-[560px] flex flex-col" style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 60%, #047857 100%)" }}>
        <div className="px-8 py-5 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Ventra</span>
          <span className="text-emerald-300 text-sm">Step 2 of 4 — Reason for Visit</span>
        </div>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What brings you in?</h2>
            <div className="grid grid-cols-1 gap-2">
              {visitorTypes.map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => setSelectedType(label)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedType === label
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-gray-100 hover:border-emerald-200 text-gray-700"
                  }`}
                >
                  <span className="text-xl">{emoji}</span> {label}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setScreen("signin-step1")} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">← Back</button>
              <button
                onClick={() => setScreen("signin-step3")}
                disabled={!selectedType}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIGN-IN STEP 3: Who are you visiting? ──
  if (screen === "signin-step3") {
    return (
      <div className="min-h-[560px] flex flex-col" style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 60%, #047857 100%)" }}>
        <div className="px-8 py-5 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Ventra</span>
          <span className="text-emerald-300 text-sm">Step 3 of 4 — Who are you seeing?</span>
        </div>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Who are you here to see?</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Name of person *</label>
                <input value={host} onChange={(e) => setHost(e.target.value)} placeholder="e.g. Mrs. Clarke" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setScreen("signin-step2")} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">← Back</button>
              <button
                onClick={() => setScreen("signin-step4")}
                disabled={!host}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIGN-IN STEP 4: Site rules ──
  if (screen === "signin-step4") {
    return (
      <div className="min-h-[560px] flex flex-col" style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 60%, #047857 100%)" }}>
        <div className="px-8 py-5 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Ventra</span>
          <span className="text-emerald-300 text-sm">Step 4 of 4 — Site Rules</span>
        </div>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Site Rules &amp; Agreement</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 h-36 overflow-y-auto leading-relaxed space-y-2 mb-4">
              <p><strong>1. ID &amp; Badges:</strong> All visitors must wear their visitor badge visibly at all times while on site.</p>
              <p><strong>2. Supervision:</strong> Visitors must be accompanied by a member of staff unless directed to reception.</p>
              <p><strong>3. Photography:</strong> Taking photographs on site is strictly prohibited without prior written consent.</p>
              <p><strong>4. Safeguarding:</strong> This is a safeguarding-aware site. Please report any concerns to reception immediately.</p>
              <p><strong>5. Health &amp; Safety:</strong> Please follow all posted health and safety instructions and emergency procedures.</p>
              <p><strong>6. Data:</strong> Your sign-in data is recorded for security and fire safety purposes only.</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-emerald-600 w-4 h-4" />
              <span className="text-sm text-gray-700">I have read and agree to the site rules and data policy.</span>
            </label>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setScreen("signin-step3")} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">← Back</button>
              <button
                onClick={handleSignInDone}
                disabled={!agreed}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Complete Sign In ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIGN-IN DONE ──
  if (screen === "signin-done") {
    return (
      <div
        className="min-h-[560px] flex flex-col items-center justify-center text-center px-8 gap-6"
        style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 60%, #047857 100%)" }}
      >
        <div className="w-20 h-20 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-300" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-extrabold">Welcome, {firstName}!</h2>
          <p className="text-emerald-300 mt-2">You&apos;re signed in. Please collect your visitor badge from reception.</p>
          <p className="text-emerald-400/60 text-sm mt-1">Visiting: {host} · {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={resetForm} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">← Back to Home</button>
          <button onClick={() => setScreen("reception")} className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"><Users size={14} /> Reception View</button>
        </div>
      </div>
    );
  }

  // ── RECEPTION DASHBOARD ──
  return (
    <div className="min-h-[560px] bg-gray-50 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Reception Dashboard</h1>
          <p className="text-sm text-gray-400">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <button onClick={() => setScreen("kiosk")} className="text-sm font-semibold text-sotara-600 hover:text-sotara-700 flex items-center gap-1">← Kiosk View</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "On Site Now",       value: visitors.length, icon: Users,     color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Checked In Today",  value: visitors.length + 2, icon: UserCheck, color: "text-blue-600",    bg: "bg-blue-50" },
          { label: "Checked Out Today", value: 2,               icon: LogOut,    color: "text-gray-600",    bg: "bg-gray-100" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={15} className={color} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Active visitors */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Currently on Site</h2>
        {visitors.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No visitors currently on site.</p>
        ) : (
          <div className="space-y-2">
            {visitors.map((v) => (
              <div key={v.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0">{v.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{v.name}</p>
                  <p className="text-xs text-gray-400 truncate">{v.company} · Seeing: {v.host}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{v.time}</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">{v.type}</span>
                  <button
                    onClick={() => handleCheckout(v.id)}
                    className="text-xs font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => setScreen("kiosk")} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">← Try the kiosk sign-in flow</button>
    </div>
  );
}
