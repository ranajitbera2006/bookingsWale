import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Save,
  Undo,
  ShieldCheck,
  Download,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { isValidIndianPhone } from "../../utils/phone";

export default function SettingsView({
  adminProfile = {
    name: "Administrator",
    email: "superadmin@bookingswale.in",
    phone: "9876543210",
    role: "Broker Manager",
  },
  onUpdateProfile,
  brokers,
  homes,
  onResetData,
}) {
  const [formData, setFormData] = useState({
    name: adminProfile.name || "Administrator",
    email: adminProfile.email || "superadmin@bookingswale.in",
    phone: adminProfile.phone || "9876543210",
    role: adminProfile.role || "Broker Manager",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Contact phone number is required");
      return;
    }

    if (!isValidIndianPhone(formData.phone)) {
      toast.error(
        "Please enter a valid 10-digit Indian mobile number (starts with 6-9)",
      );
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setHasChanges(false);
    toast.success("Profile details updated successfully!");
  };

  const handleResetProfile = () => {
    setFormData(adminProfile);
    setHasChanges(false);
  };

  const handleDownloadReport = () => {
    const backupContent = JSON.stringify(
      { brokers, homes, profile: formData },
      null,
      2,
    );
    const blob = new Blob([backupContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `inventory_records_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success("Inventory records downloaded!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Admin Account Information
            </h3>
            <p className="text-xs text-slate-400">
              Update the contact details and email address used for
              administrative notices.
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full text-sm pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                  placeholder="e.g. Rahul Das"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full text-sm pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                  placeholder="admin@bookingswale.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Contact Phone <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  className="w-full text-sm pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                  placeholder="9876543210"
                />
              </div>
              <small className="block text-[11px] text-slate-400 mt-1">
                Must be a 10-digit Indian mobile number (starts with 6, 7, 8, or
                9).
              </small>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Role / Designation
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full text-sm pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                  placeholder="e.g. Managing Director"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {hasChanges && (
              <button
                type="button"
                onClick={handleResetProfile}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <Undo className="w-3.5 h-3.5" /> Discard
              </button>
            )}
            <button
              type="submit"
              disabled={!hasChanges}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
                hasChanges
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </div>
        </form>
      </div>

      <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Business Records & Archiving
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Download a safety copy of your complete broker list and property
          catalog for offline records, or restore default entries.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" /> Download Complete Records
          </button>

          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Restore Default Records
          </button>
        </div>
      </div>
    </div>
  );
}
