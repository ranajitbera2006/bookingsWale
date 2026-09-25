
import { useState } from "react";
import toast from "react-hot-toast";
import { safeFetch } from "../utils/api";

export const useHomes = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [homes, setHomes] = useState([]);

  const getHomes = async () => {
    setLoading(true);
    try {
      const data = await safeFetch("/api/homes", { method: "GET" });
      setHomes(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addHome = async (homeData) => {
    setLoadingUp(true);
    try {
      const data = await safeFetch("/api/homes", {
        method: "POST",
        body: JSON.stringify(homeData),
      });
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

  const updateHome = async (homeId, homeData) => {
    setLoadingUp(true);
    try {
      const data = await safeFetch(`/api/homes/${homeId}`, {
        method: "PUT",
        body: JSON.stringify(homeData),
      });
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

  const deleteHome = async (homeId) => {
    setLoadingDel(true);
    try {
      await safeFetch(`/api/homes/${homeId}`, { method: "DELETE" });
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
