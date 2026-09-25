import React from "react";

export default function StatCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-xs">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <span className="block text-xs font-medium text-slate-500 mb-0.5">
          {label}
        </span>
        <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
      </div>
    </div>
  );
}
