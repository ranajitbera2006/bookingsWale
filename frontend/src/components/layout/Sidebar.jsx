
import React from "react";
import {
  LayoutDashboard,
  Users,
  BedDouble,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { useAuthContext } from "../../context/authContext";
import { useLogout } from "../../hooks/useAuth";

export default function Sidebar({
  isOpen,
  onClose,
  currentTab,
  setCurrentTab,
}) {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "brokers", label: "Brokers", icon: Users },
    { id: "rooms", label: "Rooms & Properties", icon: BedDouble },
    ...(authUser?.role === "admin"
      ? [{ id: "settings", label: "Settings", icon: Settings }]
      : []),
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br text-white flex items-center justify-center shadow-sm">
                <img
                  src="/appLogo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900 leading-tight">
                  Bookings<span className="text-indigo-600">Wale</span>
                </h2>
                <small className="text-xs text-slate-400 capitalize">
                  {authUser?.role || "Admin"} Panel
                </small>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-indigo-600" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info & Sign Out */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {authUser?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="truncate">
              <strong className="block text-xs font-bold text-slate-900 leading-tight truncate">
                {authUser?.name || "Administrator"}
              </strong>
              <small className="text-[10px] text-slate-400 block truncate">
                {authUser?.email || "admin@bookingswale.in"}
              </small>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
