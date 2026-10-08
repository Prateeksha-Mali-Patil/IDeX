import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeEvent = async (eventData) => {
  const response = await API.post("/events/analyze", eventData);
  return response.data;
};

export const getDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

export const getIdentity = async (id) => {
  const response = await API.get(`/identities/${id}`);
  return response.data;
};

export const getAnalysis = async (id) => {
  const response = await API.get(`/analysis/${id}`);
  return response.data;
};

export const getGraph = async (id) => {
  const response = await API.get(`/graph/${id}`);
  return response.data;
};

export default API;