
import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteHomeModal({ isOpen, onClose, onConfirm, home }) {
  if (!isOpen || !home) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          Delete Property?
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Are you sure you want to remove{" "}
          <strong className="text-slate-700">&ldquo;{home.title}&rdquo;</strong>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
