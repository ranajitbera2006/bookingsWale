
import React, { useState, useEffect } from "react";
import { X, Home, Save, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function HomeModal({
  isOpen,
  onClose,
  broker,
  homeToEdit,
  onSaveHome,
}) {
  const [formData, setFormData] = useState({
    title: "",
    roomType: "1 BHK",
    roomsCount: 1,
    rent: "",
    address: "",
    status: "Available",
  });

  useEffect(() => {
    if (homeToEdit) {
      setFormData(homeToEdit);
    } else {
      setFormData({
        title: "",
        roomType: "1 BHK",
        roomsCount: 1,
        rent: "",
        address: "",
        status: "Available",
      });
    }
  }, [homeToEdit, isOpen]);

  if (!isOpen || !broker) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Property title is required");
      return;
    }
    if (Number(formData.roomsCount) <= 0) {
      toast.error("Room count must be at least 1");
      return;
    }

    onSaveHome({
      ...formData,
      brokerId: broker.id,
      roomsCount: Number(formData.roomsCount),
      rent: Number(formData.rent) || 0,
      ...(homeToEdit ? { id: homeToEdit.id } : {}),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {homeToEdit ? "Edit Property" : "Add Property / Home"}
              </h2>
              <p className="text-xs text-slate-400">
                Broker:{" "}
                <strong className="text-slate-700">{broker.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Property / PG Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Niwas PG - Unit 201"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Room Type
              </label>
              <select
                value={formData.roomType}
                onChange={(e) =>
                  setFormData({ ...formData, roomType: e.target.value })
                }
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              >
                <option value="Single Room">Single Room</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="1 RK">1 RK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Room Count <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.roomsCount}
                onChange={(e) =>
                  setFormData({ ...formData, roomsCount: e.target.value })
                }
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rent / Month (₹)
              </label>
              <input
                type="number"
                min="0"
                placeholder="6000"
                value={formData.rent}
                onChange={(e) =>
                  setFormData({ ...formData, rent: e.target.value })
                }
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Address / Landmark
            </label>
            <input
              type="text"
              placeholder="e.g. Near City Center Gate 2"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition"
            >
              {homeToEdit ? (
                <Save className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {homeToEdit ? "Save Changes" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
