"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, XCircle, Clock, Users } from "lucide-react";

type RequestStatus = "Pending" | "Approved" | "Rejected";

interface LeaveRequest {
  id: number;
  name: string;
  type: string;
  start: string;
  end: string;
  days: number;
  status: RequestStatus;
}

const initialRequests: LeaveRequest[] = [
  { id: 1, name: "Sarah Mitchell", type: "Annual Leave", start: "28 Apr", end: "02 May", days: 5, status: "Pending" },
  { id: 2, name: "James Okafor",   type: "Medical Appointment", start: "15 Apr", end: "15 Apr", days: 1, status: "Approved" },
  { id: 3, name: "Priya Sharma",   type: "Annual Leave", start: "19 May", end: "23 May", days: 5, status: "Pending" },
];

const leaveTypes = ["Annual Leave", "Sick Leave", "Medical Appointment", "Compassionate Leave", "Professional Development"];

const statusBadge = (status: RequestStatus) => {
  const map: Record<RequestStatus, string> = {
    Pending:  "bg-amber-50 text-amber-700 border border-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-red-50 text-red-700 border border-red-200",
  };
  return map[status];
};

type View = "employee" | "manager";

export default function LeaveDemo() {
  const [view, setView] = useState<View>("employee");
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const usedDays = 8;
  const totalDays = 25;
  const remainingDays = totalDays - usedDays - (submitted ? 3 : 0);

  const handleSubmit = () => {
    if (!startDate || !endDate) return;
    const newReq: LeaveRequest = {
      id: Date.now(),
      name: "You",
      type: leaveType,
      start: startDate,
      end: endDate,
      days: 3,
      status: "Pending",
    };
    setRequests((prev) => [newReq, ...prev]);
    setSubmitted(true);
  };

  const handleApprove = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Approved" } : r));
  };

  const handleReject = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Rejected" } : r));
  };

  return (
    <div className="flex h-full min-h-[560px]">
      {/* Sidebar */}
      <div className="w-52 bg-[#064e3b] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-white font-bold text-base tracking-tight">LeaveSystem</span>
          <p className="text-emerald-300 text-xs mt-0.5">GSG Technologies</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {[
            { label: "My Dashboard", view: "employee" as View, icon: CalendarDays },
            { label: "Approvals", view: "manager" as View, icon: Users },
          ].map(({ label, view: v, icon: Icon }) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === v
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-100 hover:bg-white/10"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">AJ</div>
            <div>
              <p className="text-white text-xs font-medium">Alex Johnson</p>
              <p className="text-emerald-400 text-xs">Staff</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {view === "employee" ? (
          <div className="p-6 space-y-5">
            <h1 className="text-lg font-bold text-gray-900">My Leave Dashboard</h1>

            {/* Balance cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Remaining", value: remainingDays, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Used",      value: usedDays + (submitted ? 3 : 0), color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Allowance", value: totalDays,   color: "text-gray-700", bg: "bg-gray-100" },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-xl p-4`}>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                  <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">days</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Leave used</span>
                <span>{usedDays + (submitted ? 3 : 0)} / {totalDays} days</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${((usedDays + (submitted ? 3 : 0)) / totalDays) * 100}%` }}
                />
              </div>
            </div>

            {/* Request form */}
            {!submitted ? (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">New Leave Request</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Leave Type</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    >
                      {leaveTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!startDate || !endDate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Request submitted!</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Your manager has been notified. Switch to <button onClick={() => setView("manager")} className="underline font-semibold">Approvals</button> to see it.</p>
                </div>
              </div>
            )}

            {/* History */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Request History</h2>
              <div className="space-y-2">
                {requests.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-gray-300" />
                      <div>
                        <p className="text-xs font-medium text-gray-800">{r.type}</p>
                        <p className="text-xs text-gray-400">{r.start} — {r.end} · {r.days}d</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadge(r.status)}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <h1 className="text-lg font-bold text-gray-900">Pending Approvals</h1>
            <p className="text-sm text-gray-500 -mt-2">Review and action your team&apos;s leave requests below.</p>

            <div className="space-y-3">
              {requests.filter((r) => r.status === "Pending").length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">All caught up! No pending requests.</p>
                </div>
              ) : (
                requests.filter((r) => r.status === "Pending").map((r) => (
                  <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0">
                        {r.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.type} · {r.start} – {r.end} · <span className="font-medium">{r.days} days</span></p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleReject(r.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <XCircle size={13} /> Reject
                      </button>
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <CheckCircle2 size={13} /> Approve
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Team overview */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Team Overview</h2>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-100">
                    <th className="text-left pb-2 font-medium">Employee</th>
                    <th className="text-right pb-2 font-medium">Allowance</th>
                    <th className="text-right pb-2 font-medium">Used</th>
                    <th className="text-right pb-2 font-medium">Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: "Alex Johnson",   dept: "IT",      allowed: 25, used: 8 },
                    { name: "Sarah Mitchell", dept: "HR",      allowed: 25, used: 12 },
                    { name: "James Okafor",   dept: "Finance", allowed: 25, used: 6 },
                    { name: "Priya Sharma",   dept: "IT",      allowed: 25, used: 15 },
                  ].map(({ name, dept, allowed, used }) => (
                    <tr key={name} className="text-gray-700">
                      <td className="py-2">
                        <p className="font-medium">{name}</p>
                        <p className="text-gray-400">{dept}</p>
                      </td>
                      <td className="text-right py-2">{allowed}</td>
                      <td className="text-right py-2">{used}</td>
                      <td className="text-right py-2 font-semibold text-emerald-600">{allowed - used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setView("employee")}
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Back to My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
