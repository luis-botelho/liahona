import axios from "axios";

import {
  getSession,
  clearSession,
} from "./auth-storage";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const session = getSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      clearSession();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);