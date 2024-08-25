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
