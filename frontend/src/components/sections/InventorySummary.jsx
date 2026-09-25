import React from "react";
import { BedDouble, Home } from "lucide-react";

export default function InventorySummary({ homesCount, brokersCount }) {
  return (
    <section className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <BedDouble className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Live Inventory Counter
          </h2>
          <p className="text-xs text-slate-400">
            Managing{" "}
            <strong className="text-slate-700">{homesCount} properties</strong>{" "}
            distributed across{" "}
            <strong className="text-slate-700">{brokersCount} brokers</strong>.
          </p>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-600 self-start sm:self-auto">
        <Home className="w-4 h-4 text-indigo-600" />
        <span>Live Backend Synced</span>
      </div>
    </section>
  );
}
