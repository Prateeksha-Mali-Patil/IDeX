
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// AUTH
// =========================================================

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// =========================================================
// IDENTITIES
// =========================================================

export const getIdentities = async () => {
  const response = await api.get("/identities");
  return response.data;
};

export const getIdentity = async (identityId) => {
  const response = await api.get(`/identities/${identityId}`);
  return response.data;
};

// =========================================================
// RISK EVENTS
// =========================================================

export const analyzeEvent = async (eventData) => {
  const response = await api.post("/events/analyze", eventData);
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// =========================================================
// AUDIT LOGS
// =========================================================

export const getAuditLogs = async () => {
  const response = await api.get("/audit-logs");
  return response.data;
};

// =========================================================
// DEFAULT API
// =========================================================

export default api;