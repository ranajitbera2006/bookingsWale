import React from "react";

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
  Available: "bg-emerald-50 text-emerald-700",
  Occupied: "bg-amber-50 text-amber-700",
  Maintenance: "bg-rose-50 text-rose-700",
};

const dotStyles = {
  Active: "bg-emerald-500",
  Inactive: "bg-slate-400",
  Available: "bg-emerald-500",
  Occupied: "bg-amber-500",
  Maintenance: "bg-rose-500",
};

export default function StatusBadge({ status }) {
  const badgeClass = statusStyles[status] || statusStyles.Inactive;
  const dotClass = dotStyles[status] || dotStyles.Inactive;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  );
}
