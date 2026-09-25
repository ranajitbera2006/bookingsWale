import React, { useState, useEffect } from "react";
import { X, Save, RefreshCw } from "lucide-react";
import { isValidIndianPhone } from "../../utils/phone";
import toast from "react-hot-toast";

export default function BrokerModal({
  isOpen,
  onClose,
  onSave,
  brokerToEdit,
  loading,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rooms: 0,
    phone1: "",
    phone2: "",
    location: "",
    status: "Active",
  });

  useEffect(() => {
    if (brokerToEdit) {
      setFormData(brokerToEdit);
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        rooms: 0,
        phone1: "",
        phone2: "",
        location: "",
        status: "Active",
      });
    }
  }, [brokerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidIndianPhone(formData.phone1)) {
      toast.error("Phone 1 must be a valid 10-digit Indian number");
      return;
    }
    if (!isValidIndianPhone(formData.phone2)) {
      toast.error("Phone 2 must be a valid 10-digit Indian number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid login email address for the broker");
      return;
    }

    const success = await onSave({
      ...formData,
      rooms: Number(formData.rooms) || 0,
    });
    if (success) {
      onClose();
    }
  };

  const handlePhone = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val.replace(/\D/g, "").slice(0, 10),
    }));
  };

  const generateAutoPass = () => {
    const random = "BW@" + Math.random().toString(36).slice(-6);
    setFormData((prev) => ({ ...prev, password: random }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {brokerToEdit
                ? "Edit Broker"
                : "Register Broker & Generate Login"}
            </h2>
            <p className="text-xs text-slate-400">
              Account login credentials will be linked to this broker.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Broker Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Rahul Das"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Login Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="rahul@bookingswale.in"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              />
            </div>

            {!brokerToEdit && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Initial Password
                  </label>
                  <button
                    type="button"
                    onClick={generateAutoPass}
                    className="text-[10px] text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Auto-Gen
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Leave empty for default"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600 font-mono"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Base Room Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.rooms}
                onChange={(e) =>
                  setFormData({ ...formData, rooms: e.target.value })
                }
                placeholder="10"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
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
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone 1 (WhatsApp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone1}
                onChange={(e) => handlePhone("phone1", e.target.value)}
                placeholder="9876543210"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone 2 <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone2}
                onChange={(e) => handlePhone("phone2", e.target.value)}
                placeholder="9123456780"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Broker Address / City <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g. Haldia, West Bengal"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-600 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Save className="w-4 h-4" />{" "}
              {loading ? "Saving..." : "Save Broker & Send Access"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
