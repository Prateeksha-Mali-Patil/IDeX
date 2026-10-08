import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Analyze a new security event
export const analyzeEvent = async (eventData) => {
  const response = await api.post("/events/analyze", eventData);
  return response.data;
};

// Dashboard data
export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

// Identity details
export const getIdentity = async (id) => {
  const response = await api.get(`/identities/${id}`);
  return response.data;
};

// Investigation / analysis details
export const getAnalysis = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

// Relationship graph
export const getGraph = async (id) => {
  const response = await api.get(`/graph/${id}`);
  return response.data;
};

export default api;