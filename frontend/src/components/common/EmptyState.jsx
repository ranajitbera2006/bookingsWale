import React from "react";
import { UsersRound, Plus } from "lucide-react";

export default function EmptyState({ onAdd }) {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center">
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
        <UsersRound className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-800">No brokers found</h3>
      <p className="text-xs text-slate-400 mt-1 mb-5">
        Add a new broker or clear your active search query.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
      >
        <Plus className="w-4 h-4" /> Add Broker
      </button>
    </div>
  );
}
