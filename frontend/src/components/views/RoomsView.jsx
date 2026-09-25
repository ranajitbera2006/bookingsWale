import React, { useState, useMemo } from "react";
import {
  BedDouble,
  Home,
  Search,
  IndianRupee,
  MapPin,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function RoomsView({
  homes,
  brokers,
  onOpenEditHome,
  onDeleteHome,
  currentUser,
}) {
  const [roomFilter, setRoomFilter] = useState("All");
  const [search, setSearch] = useState("");

  const enrichedHomes = useMemo(() => {
    return homes.map((h) => {
      const broker = brokers.find((b) => b.id === h.brokerId);
      return {
        ...h,
        brokerName: broker ? broker.name : "Unassigned",
      };
    });
  }, [homes, brokers]);

  const filteredHomes = useMemo(() => {
    return enrichedHomes.filter((h) => {
      const matchesStatus = roomFilter === "All" || h.status === roomFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.roomType.toLowerCase().includes(q) ||
        (h.address && h.address.toLowerCase().includes(q)) ||
        h.brokerName.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [enrichedHomes, roomFilter, search]);

  const totalCapacity = homes.reduce(
    (acc, h) => acc + (Number(h.roomsCount) || 0),
    0,
  );
  const availableCount = homes.filter((h) => h.status === "Available").length;
  const occupiedCount = homes.filter((h) => h.status === "Occupied").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Capacity
            </span>
            <span className="text-xl font-bold text-slate-800">
              {totalCapacity} Rooms
            </span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Available Units
            </span>
            <span className="text-xl font-bold text-emerald-600">
              {availableCount} Properties
            </span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Occupied Units
            </span>
            <span className="text-xl font-bold text-amber-600">
              {occupiedCount} Properties
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Available", "Occupied", "Maintenance"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRoomFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                roomFilter === tab
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, location, broker..."
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white transition"
          />
        </div>
      </div>

      {filteredHomes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <BedDouble className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">
            No properties found
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try switching status filters or clearing your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHomes.map((home) => {
            const canManage =
              !currentUser ||
              currentUser.role === "admin" ||
              currentUser.id === home.brokerId;

            return (
              <div
                key={home.id}
                className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-indigo-200 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {home.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          Broker:{" "}
                          <strong className="text-slate-700">
                            {home.brokerName}
                          </strong>
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={home.status} />
                  </div>

                  <div className="flex items-center gap-2 my-3 text-xs">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {home.roomType}
                    </span>
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {home.roomsCount} {home.roomsCount > 1 ? "Rooms" : "Room"}
                    </span>
                  </div>

                  {home.address && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{home.address}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline gap-0.5">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-base font-bold text-slate-900">
                      {home.rent
                        ? Number(home.rent).toLocaleString("en-IN")
                        : "0"}
                    </span>
                    <span className="text-[11px] text-slate-400">/mo</span>
                  </div>

                  {canManage ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onOpenEditHome(home)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        title="Edit property"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteHome(home.id)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium px-2 py-0.5 bg-slate-100 rounded">
                      View-Only
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
