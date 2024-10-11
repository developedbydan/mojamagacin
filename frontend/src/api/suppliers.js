/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const getAllSuppliers = async () => {
  try {
    const res = await axios.get(`${API_URL}/suppliers`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addSupplier = async (supplierData) => {
  try {
    const res = await axios.post(`${API_URL}/suppliers`, supplierData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getSupplier = async (supplierId) => {
  try {
    const res = await axios.get(`${API_URL}/suppliers/${supplierId}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateSupplier = async (supplierId, supplierData) => {
  try {
    const response = await axios.put(
      `${API_URL}/suppliers/${supplierId}`,
      supplierData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Greška pri ažuriranju dobavljača", err.response.data);
    throw err;
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const res = await axios.delete(`${API_URL}/suppliers/${supplierId}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
