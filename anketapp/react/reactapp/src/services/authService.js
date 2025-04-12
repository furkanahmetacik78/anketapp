// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/person/kullanici"; // Backend API endpoint

export const loginUser = async (name, password) => {
  try {
    const response = await axios.post(API_URL, null, {
      params: {
        name,
        password
      }
    });
    return response.data; // Backend'den dönen kullanıcı verisini döner
  } catch (error) {
    throw error; // Hata durumunda yakalar
  }
};
