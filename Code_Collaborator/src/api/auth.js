import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // expected: { token: "JWT_TOKEN" }
};

export async function register(name, email, password) {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res.data;
}