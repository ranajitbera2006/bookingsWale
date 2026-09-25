
import { useState } from "react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const safeParse = async (res) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Server returned status ${res.status}`);
  }
};

export const useHomes = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [homes, setHomes] = useState([]);

  // GET ALL HOMES
  const getHomes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/homes`, {
        method: "GET",
        credentials: "include",
      });
      const data = await safeParse(res);
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to load properties");
      }
      setHomes(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ADD HOME
  const addHome = async (homeData) => {
    setLoadingUp(true);
    try {
      const res = await fetch(`${API_BASE}/api/homes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeData),
        credentials: "include",
      });
      const data = await safeParse(res);
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to add property");
      }
      toast.success("Property added successfully!");
      setHomes((prev) => [data, ...prev]);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingUp(false);
    }
  };

  // UPDATE HOME
  const updateHome = async (homeId, homeData) => {
    setLoadingUp(true);
    try {
      const res = await fetch(`${API_BASE}/api/homes/${homeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeData),
        credentials: "include",
      });
      const data = await safeParse(res);
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update property");
      }
      toast.success("Property updated successfully!");
      setHomes((prev) => prev.map((h) => (h.id === homeId ? data : h)));
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingUp(false);
    }
  };

  // DELETE HOME
  const deleteHome = async (homeId) => {
    setLoadingDel(true);
    try {
      const res = await fetch(`${API_BASE}/api/homes/${homeId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await safeParse(res);
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to delete property");
      }
      toast.success("Property removed successfully!");
      setHomes((prev) => prev.filter((h) => h.id !== homeId));
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingDel(false);
    }
  };

  const removeHomesByBroker = (brokerId) => {
    setHomes((prev) => prev.filter((h) => h.brokerId !== brokerId));
  };

  return {
    homes,
    setHomes,
    loading,
    loadingUp,
    loadingDel,
    getHomes,
    addHome,
    updateHome,
    deleteHome,
    removeHomesByBroker,
  };
};
