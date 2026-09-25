
const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "An error occurred");
  }
  return data;
};

export const api = {
  // Brokers
  getBrokers: () => fetch(`${API_BASE}/brokers`).then(handleResponse),
  createBroker: (broker) =>
    fetch(`${API_BASE}/brokers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(broker),
    }).then(handleResponse),
  updateBroker: (id, broker) =>
    fetch(`${API_BASE}/brokers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(broker),
    }).then(handleResponse),
  deleteBroker: (id) =>
    fetch(`${API_BASE}/brokers/${id}`, { method: "DELETE" }).then(
      handleResponse,
    ),

  // Homes
  getHomes: () => fetch(`${API_BASE}/homes`).then(handleResponse),
  createHome: (home) =>
    fetch(`${API_BASE}/homes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(home),
    }).then(handleResponse),
  updateHome: (id, home) =>
    fetch(`${API_BASE}/homes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(home),
    }).then(handleResponse),
  deleteHome: (id) =>
    fetch(`${API_BASE}/homes/${id}`, { method: "DELETE" }).then(handleResponse),

  // Profile
  getProfile: () => fetch(`${API_BASE}/profile`).then(handleResponse),
  updateProfile: (profile) =>
    fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).then(handleResponse),
};
