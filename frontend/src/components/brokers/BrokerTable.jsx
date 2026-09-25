// src/components/brokers/BrokerTable.jsx
import React, { useState } from "react";
import BrokerTableRow from "./BrokerTableRow";

export default function BrokerTable({
  brokers,
  homes,
  onEdit,
  onDelete,
  onOpenAddHome,
  onOpenEditHome,
  onDeleteHome,
  currentUser,
}) {
  const [expandedBrokerId, setExpandedBrokerId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBrokerId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-237.5">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <th className="py-3.5 px-4 w-10"></th>
            <th className="py-3.5 px-4">Broker</th>
            <th className="py-3.5 px-4">Properties / Rooms</th>
            <th className="py-3.5 px-4">Phone 1</th>
            <th className="py-3.5 px-4">Phone 2</th>
            <th className="py-3.5 px-4">Location</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {brokers.map((broker) => {
            const isAdmin = currentUser?.role === "admin";
            // Check if logged-in broker matches this row's broker record
            const isOwner =
              currentUser?.brokerId === broker.id ||
              currentUser?.brokerId === broker._id ||
              currentUser?.id === broker.id ||
              currentUser?.id === broker._id;

            // Only the owner broker OR the admin can add homes to this broker
            const canAddHome = isAdmin || isOwner;

            // General management (editing/deleting broker entry itself is admin-only or owner)
            const canManage = isAdmin || isOwner;

            return (
              <BrokerTableRow
                key={broker.id || broker._id}
                broker={broker}
                brokerHomes={homes.filter(
                  (h) => h.brokerId === broker.id || h.brokerId === broker._id,
                )}
                isExpanded={expandedBrokerId === (broker.id || broker._id)}
                onToggleExpand={toggleExpand}
                onEdit={onEdit}
                onDelete={onDelete}
                onOpenAddHome={onOpenAddHome}
                onOpenEditHome={onOpenEditHome}
                onDeleteHome={onDeleteHome}
                canManage={canManage}
                canAddHome={canAddHome}
                isAdmin={isAdmin}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
