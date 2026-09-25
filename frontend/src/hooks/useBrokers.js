import { useState } from "react";
import toast from "react-hot-toast";

export const useBrokers = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [brokers, setBrokers] = useState([]);

  // GET ALL BROKERS
  const getBrokers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/brokers", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to load brokers");
      }
      setBrokers(data);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ADD BROKER
  const addBroker = async (brokerData) => {
    setLoadingUp(true);
    try {
      const res = await fetch("/api/brokers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brokerData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to add broker");
      }
      toast.success("Broker added successfully!");
      setBrokers((prev) => [data, ...prev]);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingUp(false);
    }
  };

  // UPDATE BROKER
  const updateBroker = async (brokerId, updateData) => {
    setLoadingUp(true);
    try {
      const res = await fetch(`/api/brokers/${brokerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update broker");
      }
      toast.success("Broker updated successfully!");
      setBrokers((prev) => prev.map((b) => (b.id === brokerId ? data : b)));
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingUp(false);
    }
  };

  // DELETE BROKER
  const deleteBroker = async (brokerId) => {
    setLoadingDel(true);
    try {
      const res = await fetch(`/api/brokers/${brokerId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to delete broker");
      }
      toast.success("Broker removed successfully!");
      setBrokers((prev) => prev.filter((b) => b.id !== brokerId));
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadingDel(false);
    }
  };

  return {
    brokers,
    setBrokers,
    loading,
    loadingUp,
    loadingDel,
    getBrokers,
    addBroker,
    updateBroker,
    deleteBroker,
  };
};
