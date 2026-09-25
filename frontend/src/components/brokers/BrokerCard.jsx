// src/components/brokers/BrokerCard.jsx
import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getInitials } from "../../utils/phone";
import PhoneCell from "../common/PhoneCell";
import StatusBadge from "../common/StatusBadge";
import BrokerHomesList from "../homes/BrokerHomesList";

export default function BrokerCard({
  broker,
  homes,
  onEdit,
  onDelete,
  onOpenAddHome,
  onOpenEditHome,
  onDeleteHome,
  currentUser,
}) {
  const [showHomes, setShowHomes] = useState(false);
  const brokerHomes = homes.filter(
    (h) => h.brokerId === broker.id || h.brokerId === broker._id,
  );
  const calculatedRooms =
    brokerHomes.reduce((sum, h) => sum + (Number(h.roomsCount) || 0), 0) ||
    broker.rooms;

  const isAdmin = currentUser?.role === "admin";
  const isOwner =
    currentUser?.brokerId === broker.id ||
    currentUser?.brokerId === broker._id ||
    currentUser?.id === broker.id ||
    currentUser?.id === broker._id;

  const canAddHome = isAdmin || isOwner;
  const canManage = isAdmin || isOwner;

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs">
            {getInitials(broker.name)}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 leading-tight">
              {broker.name}
            </h4>
            <span className="text-[11px] text-slate-400">
              Added {broker.dateAdded}
            </span>
          </div>
        </div>
        <StatusBadge status={broker.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
            Rooms & Homes
          </span>
          <strong className="text-slate-800 text-sm">
            {calculatedRooms} Rooms{" "}
            <span className="text-xs font-normal text-slate-500">
              ({brokerHomes.length}{" "}
              {brokerHomes.length === 1 ? "Home" : "Homes"})
            </span>
          </strong>
        </div>
        <div className="p-2.5 bg-slate-50 rounded-lg">
          <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
            Location
          </span>
          <strong className="text-slate-800 truncate block">
            {broker.location}
          </strong>
        </div>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-3">
        <PhoneCell phone={broker.phone1} label="Phone 1" />
        <PhoneCell phone={broker.phone2} label="Phone 2" />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => setShowHomes(!showHomes)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 py-1 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>
            {showHomes
              ? "Hide Properties"
              : `Properties (${brokerHomes.length})`}
          </span>
          {showHomes ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {canAddHome && (
            <button
              type="button"
              onClick={() => onOpenAddHome(broker)}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Home
            </button>
          )}

          {isAdmin && (
            <>
              <button
                type="button"
                onClick={() => onEdit(broker)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(broker.id || broker._id)}
                className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {showHomes && (
        <div className="border-t border-slate-100 pt-3 mt-2">
          <BrokerHomesList
            homes={brokerHomes}
            onEditHome={onOpenEditHome}
            onDeleteHome={onDeleteHome}
            canManage={canManage}
          />
        </div>
      )}
    </div>
  );
}
