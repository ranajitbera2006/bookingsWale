import React from "react";
import { Home, Trash2, Pencil, MapPin, IndianRupee } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function HomeCard({
  home,
  onEditHome,
  onDeleteHome,
  canManage,
}) {
  return (
    <div className="p-3.5 bg-white border border-slate-200/90 rounded-xl shadow-xs hover:border-indigo-200 transition flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight truncate max-w-35">
                {home.title}
              </h4>
              {home.address && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-32.5">{home.address}</span>
                </span>
              )}
            </div>
          </div>

          {/* Render Edit and Delete only if authorized */}
          {canManage && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEditHome(home)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                title="Edit Property"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteHome(home.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Delete Property"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 my-2">
          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {home.roomType} &bull; {home.roomsCount}{" "}
            {home.roomsCount > 1 ? "Rooms" : "Room"}
          </span>
          <StatusBadge status={home.status} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-[11px] text-slate-400">Rent</span>
        <span className="inline-flex items-center font-bold text-slate-900 text-sm">
          <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
          {home.rent ? Number(home.rent).toLocaleString("en-IN") : "0"}
          <span className="text-[10px] font-normal text-slate-400 ml-0.5">
            /mo
          </span>
        </span>
      </div>
    </div>
  );
}
