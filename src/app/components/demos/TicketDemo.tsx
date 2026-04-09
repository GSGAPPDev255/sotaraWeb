"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { LayoutDashboard, PlusCircle, Ticket, AlertTriangle, CheckCircle2, Clock, Search } from "lucide-react";

type Priority = "Critical" | "High" | "Medium" | "Low";
type Status = "New" | "In Progress" | "Resolved";
type View = "dashboard" | "new-ticket";

interface TicketItem {
  id: string;
  subject: string;
  category: string;
  priority: Priority;
  status: Status;
  requester: string;
  created: string;
}

const chartData = [
  { day: "Mon", tickets: 4 },
  { day: "Tue", tickets: 7 },
  { day: "Wed", tickets: 5 },
  { day: "Thu", tickets: 9 },
  { day: "Fri", tickets: 6 },
  { day: "Sat", tickets: 2 },
  { day: "Sun", tickets: 1 },
];

const kbArticles = [
  { title: "How to reset your password", category: "Account", content: "Visit the login page and click 'Forgot Password'..." },
  { title: "VPN setup guide for Windows", category: "Network", content: "Download the VPN client from the IT portal..." },
  { title: "Outlook not syncing emails", category: "Email", content: "Try restarting the Outlook client and checking..." },
  { title: "Printer offline troubleshooting", category: "Hardware", content: "Check the printer is powered on and connected..." },
  { title: "How to request software installation", category: "Software", content: "Submit a request via the IT portal with justification..." },
];

const priorityBadge: Record<Priority, string> = {
  Critical: "bg-rose-50 text-rose-700 border border-rose-200",
  High:     "bg-orange-50 text-orange-700 border border-orange-200",
  Medium:   "bg-blue-50 text-blue-700 border border-blue-200",
  Low:      "bg-gray-50 text-gray-600 border border-gray-200",
};

const statusBadge: Record<Status, string> = {
  "New":         "bg-blue-50 text-blue-700 border border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border border-amber-200",
  "Resolved":    "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const initialTickets: TicketItem[] = [
  { id: "APR-25-001", subject: "Laptop not connecting to WiFi", category: "Network",  priority: "High",   status: "In Progress", requester: "Tom Clarke",  created: "Today 09:14" },
  { id: "APR-25-002", subject: "Cannot access SharePoint",      category: "Software", priority: "Medium", status: "New",         requester: "Lisa Grant",  created: "Today 10:32" },
  { id: "APR-25-003", subject: "Email not syncing on mobile",   category: "Email",    priority: "Low",    status: "New",         requester: "Raj Patel",   created: "Today 11:05" },
  { id: "APR-25-004", subject: "Printer offline in Room 3B",    category: "Hardware", priority: "Critical", status: "New",       requester: "Fiona Adams", created: "Today 11:48" },
];

const categories = ["Hardware", "Software", "Network", "Email", "Account", "Other"];
const priorities: Priority[] = ["Critical", "High", "Medium", "Low"];

export default function TicketDemo() {
  const [view, setView] = useState<View>("dashboard");
  const [tickets, setTickets] = useState<TicketItem[]>(initialTickets);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hardware");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [submitted, setSubmitted] = useState(false);
  const [deflected, setDeflected] = useState(false);

  const suggestions = kbArticles.filter(
    (a) =>
      subject.length >= 4 &&
      (a.title.toLowerCase().includes(subject.toLowerCase().split(" ")[0]) ||
        a.category.toLowerCase() === category.toLowerCase())
  ).slice(0, 3);

  const handleSubmit = () => {
    if (!subject || !description) return;
    const newTicket: TicketItem = {
      id: `APR-25-00${tickets.length + 1}`,
      subject,
      category,
      priority,
      status: "New",
      requester: "You",
      created: "Just now",
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSubmitted(true);
  };

  const handleDeflect = (article: typeof kbArticles[0]) => {
    setDeflected(true);
    const deflectedTicket: TicketItem = {
      id: `APR-25-00${tickets.length + 1}`,
      subject: `[Deflected] ${subject || article.title}`,
      category: article.category as TicketItem["category"],
      priority: "Low",
      status: "Resolved",
      requester: "You",
      created: "Just now",
    };
    setTickets((prev) => [deflectedTicket, ...prev]);
  };

  const openCount  = tickets.filter((t) => t.status === "New").length;
  const slaBreaches = tickets.filter((t) => t.priority === "Critical" && t.status === "New").length;

  return (
    <div className="flex h-full min-h-[560px]">
      {/* Sidebar */}
      <div className="w-52 bg-[#0f172a] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-white font-bold text-base tracking-tight">SwiftCues</span>
          <p className="text-blue-400 text-xs mt-0.5">Rapid Response</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {[
            { label: "Dashboard",   v: "dashboard" as View,   icon: LayoutDashboard },
            { label: "New Ticket",  v: "new-ticket" as View,  icon: PlusCircle },
          ].map(({ label, v, icon: Icon }) => (
            <button
              key={v}
              onClick={() => { setView(v); setSubmitted(false); setDeflected(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === v ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">IT</div>
            <div>
              <p className="text-white text-xs font-medium">IT Support</p>
              <p className="text-slate-400 text-xs">Technician</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {view === "dashboard" ? (
          <div className="p-6 space-y-5">
            <h1 className="text-lg font-bold text-gray-900">Support Dashboard</h1>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Open Tickets",  value: openCount,   icon: Ticket,        color: "text-blue-600",   bg: "bg-blue-50" },
                { label: "SLA Breaches",  value: slaBreaches, icon: AlertTriangle,  color: "text-rose-600",   bg: "bg-rose-50" },
                { label: "Resolved Today",value: 3,           icon: CheckCircle2,   color: "text-emerald-600",bg: "bg-emerald-50" },
                { label: "Avg Response",  value: "2h 14m",    icon: Clock,          color: "text-amber-600",  bg: "bg-amber-50" },
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

            {/* Chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">7-Day Ticket Volume</h2>
              <ResponsiveContainer width="100%" height={130}>
                <BarChart data={chartData} barSize={22}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="tickets" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Ticket queue */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">Active Queue</h2>
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5 text-xs text-gray-400">
                  <Search size={11} /> Search tickets…
                </div>
              </div>
              <div className="space-y-2">
                {tickets.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-mono w-24 shrink-0">{t.id}</span>
                    <p className="text-sm text-gray-800 font-medium flex-1 truncate">{t.subject}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${priorityBadge[t.priority]}`}>{t.priority}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusBadge[t.status]}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {submitted || deflected ? (
              <div className="max-w-lg mx-auto mt-8">
                <div className={`rounded-xl border p-6 text-center ${deflected ? "bg-emerald-50 border-emerald-200" : "bg-blue-50 border-blue-200"}`}>
                  <CheckCircle2 size={36} className={`mx-auto mb-3 ${deflected ? "text-emerald-500" : "text-blue-500"}`} />
                  <p className="font-bold text-gray-900 text-base">{deflected ? "Issue resolved via Knowledge Base!" : "Ticket submitted successfully!"}</p>
                  <p className="text-sm text-gray-500 mt-1">{deflected ? "No ticket raised — marked as self-resolved." : `Your ticket has been created and assigned to the IT team.`}</p>
                  <button
                    onClick={() => { setView("dashboard"); setSubmitted(false); setDeflected(false); setSubject(""); setDescription(""); }}
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                  <h1 className="text-lg font-bold text-gray-900">Raise a Ticket</h1>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Laptop not connecting to VPN"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                    <textarea
                      placeholder="Describe the issue in detail…"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                        {categories.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Priority</label>
                      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                        {priorities.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!subject || !description}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Submit Ticket
                  </button>
                </div>

                {/* KB suggestions */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Search size={14} className="text-blue-500" /> Knowledge Base Suggestions
                  </h2>
                  {subject.length < 4 ? (
                    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-xs text-gray-400">Start typing your issue and we&apos;ll suggest relevant articles that might resolve it instantly.</p>
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-xs text-gray-400">No matching articles found. Your ticket will be assigned to the team.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {suggestions.map((a) => (
                        <div key={a.title} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">{a.category}</span>
                              <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{a.content}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeflect(a)}
                            className="mt-3 w-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-1.5 rounded-lg transition-colors"
                          >
                            ✓ This resolved my issue
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
