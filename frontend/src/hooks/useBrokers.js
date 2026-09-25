
import { useState } from "react";
import toast from "react-hot-toast";
import { safeFetch } from "../utils/api";

export const useBrokers = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [brokers, setBrokers] = useState([]);

  const getBrokers = async () => {
    setLoading(true);
    try {
      const data = await safeFetch("/api/brokers", { method: "GET" });
      setBrokers(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addBroker = async (brokerData) => {
    setLoadingUp(true);
    try {
      const data = await safeFetch("/api/brokers", {
        method: "POST",
        body: JSON.stringify(brokerData),
      });
      toast.success("Broker added successfully!");
      setBrokers((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoadingUp(false);
    }
  };

  const updateBroker = async (brokerId, updateData) => {
    setLoadingUp(true);
    try {
      const data = await safeFetch(`/api/brokers/${brokerId}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });
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

  const deleteBroker = async (brokerId) => {
    setLoadingDel(true);
    try {
      await safeFetch(`/api/brokers/${brokerId}`, { method: "DELETE" });
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
