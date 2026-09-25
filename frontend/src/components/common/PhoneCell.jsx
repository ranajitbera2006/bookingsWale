import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { formatPhone, normalizeIndianPhone } from "../../utils/phone";
import toast from "react-hot-toast";

export default function PhoneCell({ phone, label }) {
  const clean = normalizeIndianPhone(phone);

  const handleCall = () => {
    if (!clean) return toast.error("Invalid phone number");
    window.location.href = `tel:+91${clean}`;
  };

  const handleWhatsApp = () => {
    if (!clean) return toast.error("Invalid phone number");
    window.open(`https://wa.me/91${clean}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-700">
        {label ? `${label}: ` : ""}
        {formatPhone(phone)}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleCall}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200 rounded-md transition"
        >
          <Phone className="w-3 h-3" /> Call
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200 rounded-md transition"
        >
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </button>
      </div>
    </div>
  );
}
