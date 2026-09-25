import React from "react";
import { Users, BedDouble, UserCheck, UserX } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid({ brokers, homes }) {
  const totalRooms = homes.reduce(
    (sum, h) => sum + (Number(h.roomsCount) || 0),
    0,
  );
  const activeCount = brokers.filter((b) => b.status === "Active").length;
  const inactiveCount = brokers.filter((b) => b.status === "Inactive").length;

  const stats = [
    {
      label: "Total Brokers",
      value: brokers.length,
      icon: Users,
      colorClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Managed Rooms",
      value: totalRooms,
      icon: BedDouble,
      colorClass: "bg-purple-50 text-purple-600",
    },
    {
      label: "Active Brokers",
      value: activeCount,
      icon: UserCheck,
      colorClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Inactive Brokers",
      value: inactiveCount,
      icon: UserX,
      colorClass: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s, idx) => (
        <StatCard key={idx} {...s} />
      ))}
    </section>
  );
}
