import axios from "axios";

const API_URL = "http://192.168.2.134:5000/api/auth";

export const authService = {
  async register(email: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },
};
