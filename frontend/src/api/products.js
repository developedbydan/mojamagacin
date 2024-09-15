import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const getAllProducts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get(`${API_URL}/products`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
