import React from "react";
import { Menu, Plus, Home } from "lucide-react";

export default function Topbar({
  onOpenSidebar,
  onAddBroker,
  onAddHomeForSelf,
  currentTab,
  authUser,
}) {
  const isBroker = authUser?.role === "broker";
  const isAdmin = authUser?.role === "admin";

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 md:hidden shadow-sm"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            {isBroker ? "My Property Portal" : "Broker Management"}
          </h1>
          <p className="text-sm text-slate-500">
            {isBroker
              ? "Manage your assigned properties and listings."
              : "Manage all brokers and room inventory."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        {isAdmin && currentTab !== "settings" && (
          <button
            type="button"
            onClick={onAddBroker}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Broker</span>
          </button>
        )}

        {isBroker && (
          <button
            type="button"
            onClick={onAddHomeForSelf}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>+ Add My Property</span>
          </button>
        )}
      </div>
    </header>
  );
}
