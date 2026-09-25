import React from "react";
import HomeCard from "./HomeCard";

export default function BrokerHomesList({
  homes,
  onEditHome,
  onDeleteHome,
  canManage,
}) {
  if (homes.length === 0) {
    return (
      <div className="py-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        No properties added for this broker yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {homes.map((home) => (
        <HomeCard
          key={home.id}
          home={home}
          onEditHome={onEditHome}
          onDeleteHome={onDeleteHome}
          canManage={canManage}
        />
      ))}
    </div>
  );
}
