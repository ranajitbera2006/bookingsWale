
import React, { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";

import Login from "./components/pages/Login";

import { useBrokers } from "./hooks/useBrokers";
import { useHomes } from "./hooks/useHomes";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import StatsGrid from "./components/stats/StatsGrid";
import InventorySummary from "./components/sections/InventorySummary";

import SearchInput from "./components/common/SearchInput";
import EmptyState from "./components/common/EmptyState";

import BrokerTable from "./components/brokers/BrokerTable";
import BrokerCard from "./components/brokers/BrokerCard";
import BrokerModal from "./components/brokers/BrokerModal";
import DeleteBrokerModal from "./components/brokers/DeleteBrokerModal";

import AddHomeModal from "./components/homes/AddHomeModal";
import EditHomeModal from "./components/homes/EditHomeModal";

import RoomsView from "./components/views/RoomsView";
import SettingsView from "./components/views/SettingsView";

export default function App() {
  const { authUser, setAuthUser } = useAuthContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [search, setSearch] = useState("");

  const {
    brokers,
    loading: loadingBrokers,
    loadingUp: loadingUpBroker,
    loadingDel: loadingDelBroker,
    getBrokers,
    addBroker,
    updateBroker,
    deleteBroker,
  } = useBrokers();

  const {
    homes,
    loadingUp: loadingUpHome,
    getHomes,
    addHome,
    updateHome,
    deleteHome,
    removeHomesByBroker,
  } = useHomes();

  // Modals state
  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState(false);
  const [brokerToEdit, setBrokerToEdit] = useState(null);
  const [brokerToDelete, setBrokerToDelete] = useState(null);

  const [isAddHomeOpen, setIsAddHomeOpen] = useState(false);
  const [selectedBrokerForHome, setSelectedBrokerForHome] = useState(null);

  const [isEditHomeOpen, setIsEditHomeOpen] = useState(false);
  const [homeToEdit, setHomeToEdit] = useState(null);

  // 1. CRITICAL: Reset tab, close modals, and fetch data on auth change
  useEffect(() => {
    // Reset to safe default tab whenever auth state changes
    setCurrentTab("dashboard");
    setIsBrokerModalOpen(false);
    setIsAddHomeOpen(false);
    setIsEditHomeOpen(false);
    setBrokerToDelete(null);

    if (authUser) {
      getBrokers();
      getHomes();
    }
  }, [authUser]);

  // If user is not logged in, render Login cleanly
  if (!authUser) {
    return (
      <>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Login />
      </>
    );
  }

  // Safe brokers array fallback
  const safeBrokers = Array.isArray(brokers) ? brokers : [];
  const safeHomes = Array.isArray(homes) ? homes : [];

  const filteredBrokers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return safeBrokers;
    return safeBrokers.filter(
      (b) =>
        b?.name?.toLowerCase().includes(q) ||
        b?.phone1?.includes(q) ||
        b?.location?.toLowerCase().includes(q),
    );
  }, [safeBrokers, search]);

  const handleUpdateProfile = (formData) => {
    const updatedUser = {
      ...authUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || authUser.phone,
      role: formData.role || authUser.role,
    };

    setAuthUser(updatedUser);
    localStorage.setItem("broker-user", JSON.stringify(updatedUser));
  };

  const handleSaveBroker = async (data) => {
    if (brokerToEdit) {
      return await updateBroker(brokerToEdit.id, data);
    }

    const created = await addBroker(data);
    if (created && created.temporaryPassword) {
      const message = encodeURIComponent(
        `Hello ${created.name},\nYour BookingsWale Broker Account is active!\n\nPortal: http://localhost:3000\nEmail: ${created.email}\nTemporary Password: ${created.temporaryPassword}\n\nPlease log in and add your property listings.`,
      );
      window.open(
        `https://wa.me/91${created.phone1}?text=${message}`,
        "_blank",
      );
      toast.success(`Access sent to ${created.name} via WhatsApp!`, {
        duration: 6000,
      });
      return true;
    }
    return Boolean(created);
  };

  const handleConfirmDeleteBroker = async () => {
    if (!brokerToDelete) return;
    const success = await deleteBroker(brokerToDelete);
    if (success) {
      removeHomesByBroker(brokerToDelete);
      setBrokerToDelete(null);
    }
  };

  const handleAddHomeForSelf = () => {
    const myBrokerProfile = safeBrokers.find(
      (b) => b.id === authUser?.id || b.id === authUser?.brokerId,
    ) || {
      id: authUser?.brokerId || authUser?.id,
      name: authUser?.name,
    };

    setSelectedBrokerForHome(myBrokerProfile);
    setIsAddHomeOpen(true);
  };

  const handleOpenEditHome = (home) => {
    setHomeToEdit(home);
    setIsEditHomeOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        authUser={authUser}
      />

      <main className="flex-1 md:ml-64 p-4 sm:p-8 max-w-7xl w-full">
        <Topbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onAddBroker={() => {
            setBrokerToEdit(null);
            setIsBrokerModalOpen(true);
          }}
          onAddHomeForSelf={handleAddHomeForSelf}
          currentTab={currentTab}
          authUser={authUser}
        />

        {/* DASHBOARD TAB */}
        {currentTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <StatsGrid brokers={safeBrokers} homes={safeHomes} />

            <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Active Brokers Overview
                  </h2>
                  <p className="text-xs text-slate-400">
                    {authUser?.role === "admin"
                      ? "Complete roster of brokers and listing inventories."
                      : "Broker network overview. You can manage your own properties."}
                  </p>
                </div>
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search broker..."
                />
              </div>

              {loadingBrokers ? (
                <div className="p-12 text-center text-xs text-slate-400">
                  Loading brokers...
                </div>
              ) : filteredBrokers.length === 0 ? (
                <EmptyState onAdd={() => setIsBrokerModalOpen(true)} />
              ) : (
                <>
                  <BrokerTable
                    brokers={filteredBrokers.slice(0, 5)}
                    homes={safeHomes}
                    currentUser={authUser}
                    onEdit={(b) => {
                      setBrokerToEdit(b);
                      setIsBrokerModalOpen(true);
                    }}
                    onDelete={(id) => setBrokerToDelete(id)}
                    onOpenAddHome={(broker) => {
                      setSelectedBrokerForHome(broker);
                      setIsAddHomeOpen(true);
                    }}
                    onOpenEditHome={handleOpenEditHome}
                    onDeleteHome={(homeId) => deleteHome(homeId)}
                  />
                  <div className="p-4 space-y-3 md:hidden">
                    {filteredBrokers.slice(0, 5).map((b) => (
                      <BrokerCard
                        key={b.id || b._id}
                        broker={b}
                        homes={safeHomes}
                        currentUser={authUser}
                        onEdit={(broker) => {
                          setBrokerToEdit(broker);
                          setIsBrokerModalOpen(true);
                        }}
                        onDelete={(id) => setBrokerToDelete(id)}
                        onOpenAddHome={(broker) => {
                          setSelectedBrokerForHome(broker);
                          setIsAddHomeOpen(true);
                        }}
                        onOpenEditHome={handleOpenEditHome}
                        onDeleteHome={(homeId) => deleteHome(homeId)}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>

            <InventorySummary
              homesCount={safeHomes.length}
              brokersCount={safeBrokers.length}
            />
          </div>
        )}

        {/* BROKERS TAB */}
        {currentTab === "brokers" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    All Brokers Database
                  </h2>
                  <p className="text-xs text-slate-400">
                    View and manage properties across all brokers.
                  </p>
                </div>
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search broker..."
                />
              </div>

              {loadingBrokers ? (
                <div className="p-12 text-center text-xs text-slate-400">
                  Loading brokers...
                </div>
              ) : filteredBrokers.length === 0 ? (
                <EmptyState onAdd={() => setIsBrokerModalOpen(true)} />
              ) : (
                <>
                  <BrokerTable
                    brokers={filteredBrokers}
                    homes={safeHomes}
                    currentUser={authUser}
                    onEdit={(b) => {
                      setBrokerToEdit(b);
                      setIsBrokerModalOpen(true);
                    }}
                    onDelete={(id) => setBrokerToDelete(id)}
                    onOpenAddHome={(broker) => {
                      setSelectedBrokerForHome(broker);
                      setIsAddHomeOpen(true);
                    }}
                    onOpenEditHome={handleOpenEditHome}
                    onDeleteHome={(homeId) => deleteHome(homeId)}
                  />
                  <div className="p-4 space-y-3 md:hidden">
                    {filteredBrokers.map((b) => (
                      <BrokerCard
                        key={b.id || b._id}
                        broker={b}
                        homes={safeHomes}
                        currentUser={authUser}
                        onEdit={(broker) => {
                          setBrokerToEdit(broker);
                          setIsBrokerModalOpen(true);
                        }}
                        onDelete={(id) => setBrokerToDelete(id)}
                        onOpenAddHome={(broker) => {
                          setSelectedBrokerForHome(broker);
                          setIsAddHomeOpen(true);
                        }}
                        onOpenEditHome={handleOpenEditHome}
                        onDeleteHome={(homeId) => deleteHome(homeId)}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        )}

        {/* ROOMS TAB */}
        {currentTab === "rooms" && (
          <div className="animate-in fade-in duration-150">
            <RoomsView
              homes={safeHomes}
              brokers={safeBrokers}
              onOpenEditHome={handleOpenEditHome}
              onDeleteHome={(homeId) => deleteHome(homeId)}
              currentUser={authUser}
            />
          </div>
        )}

        {/* SETTINGS TAB (Admin Only) */}
        {currentTab === "settings" && authUser?.role === "admin" && (
          <div className="animate-in fade-in duration-150">
            <SettingsView
              adminProfile={authUser}
              onUpdateProfile={handleUpdateProfile}
              brokers={safeBrokers}
              homes={safeHomes}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <BrokerModal
        isOpen={isBrokerModalOpen}
        onClose={() => setIsBrokerModalOpen(false)}
        onSave={handleSaveBroker}
        brokerToEdit={brokerToEdit}
        loading={loadingUpBroker}
      />

      <AddHomeModal
        isOpen={isAddHomeOpen}
        onClose={() => setIsAddHomeOpen(false)}
        broker={selectedBrokerForHome}
        onSaveHome={addHome}
        loading={loadingUpHome}
      />

      <EditHomeModal
        isOpen={isEditHomeOpen}
        onClose={() => {
          setIsEditHomeOpen(false);
          setHomeToEdit(null);
        }}
        home={homeToEdit}
        onUpdateHome={updateHome}
        loading={loadingUpHome}
      />

      <DeleteBrokerModal
        isOpen={Boolean(brokerToDelete)}
        onClose={() => setBrokerToDelete(null)}
        onConfirm={handleConfirmDeleteBroker}
        loading={loadingDelBroker}
      />
    </div>
  );
}
