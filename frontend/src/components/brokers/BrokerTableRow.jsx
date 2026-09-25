// src/components/brokers/BrokerTableRow.jsx
import React from "react";
import {
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Plus,
  Home,
} from "lucide-react";
import { getInitials } from "../../utils/phone";
import PhoneCell from "../common/PhoneCell";
import StatusBadge from "../common/StatusBadge";
import BrokerHomesList from "../homes/BrokerHomesList";

export default function BrokerTableRow({
  broker,
  brokerHomes,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onOpenAddHome,
  onOpenEditHome,
  onDeleteHome,
  canManage,
  canAddHome,
  isAdmin,
}) {
  const calculatedRooms =
    brokerHomes.reduce((sum, h) => sum + (Number(h.roomsCount) || 0), 0) ||
    broker.rooms;

  return (
    <>
      <tr
        className={`hover:bg-slate-50/70 transition ${isExpanded ? "bg-indigo-50/30" : ""}`}
      >
        <td className="py-4 px-3 text-center">
          <button
            type="button"
            onClick={() => onToggleExpand(broker.id || broker._id)}
            className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer"
            title={isExpanded ? "Collapse properties" : "View properties"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs">
              {getInitials(broker.name)}
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">
                {broker.name}
              </p>
              <span className="text-[11px] text-slate-400">
                Added {broker.dateAdded}
              </span>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <button
            type="button"
            onClick={() => onToggleExpand(broker.id || broker._id)}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition">
              {calculatedRooms} Rooms
            </span>
            <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
              {brokerHomes.length} {brokerHomes.length === 1 ? "Home" : "Homes"}
            </span>
          </button>
        </td>
        <td className="py-4 px-4">
          <PhoneCell phone={broker.phone1} />
        </td>
        <td className="py-4 px-4">
          <PhoneCell phone={broker.phone2} />
        </td>
        <td className="py-4 px-4 text-slate-600 max-w-xs truncate">
          {broker.location}
        </td>
        <td className="py-4 px-4">
          <StatusBadge status={broker.status} />
        </td>
        <td className="py-4 px-4 text-right">
          <div className="flex items-center justify-end gap-1.5">
            {/* ONLY rendered for the owner broker or Admin */}
            {canAddHome && (
              <button
                type="button"
                onClick={() => onOpenAddHome(broker)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Home</span>
              </button>
            )}

            {/* Edit/Delete broker is admin-only */}
            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={() => onEdit(broker)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                  title="Edit Broker"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(broker.id || broker._id)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Delete Broker"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}

            {!canAddHome && !isAdmin && (
              <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-100 rounded-md">
                Read-Only
              </span>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded properties drawer */}
      {isExpanded && (
        <tr>
          <td
            colSpan="8"
            className="bg-slate-50/70 p-4 border-y border-slate-200/80"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-indigo-600" />
                  Properties Managed by {broker.name} ({brokerHomes.length})
                </h4>
                {canAddHome && (
                  <button
                    type="button"
                    onClick={() => onOpenAddHome(broker)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add New Property
                  </button>
                )}
              </div>
              <BrokerHomesList
                homes={brokerHomes}
                onEditHome={onOpenEditHome}
                onDeleteHome={onDeleteHome}
                canManage={canManage}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
