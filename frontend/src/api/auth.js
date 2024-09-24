/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (err) {
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error("Osvežavanje access tokena nije uspelo", err);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/user`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/status`, {
      withCredentials: true,
    });
    return response.data.isAuthenticated;
  } catch (err) {
    console.error("Greška pri proveri autentifikacije", err);
    return false;
  }
};
