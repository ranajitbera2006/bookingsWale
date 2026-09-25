import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white transition"
      />
    </div>
  );
}
