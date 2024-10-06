/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getProduct = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/products/${productId}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Greška pri dodavanju proizvoda", err.response.data);
    throw err;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${API_URL}/products/${productId}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}/products/${productId}`,
      productData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Greška pri ažuriranju proizvoda", err.response.data);
    throw err;
  }
};
