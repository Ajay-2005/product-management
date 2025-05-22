import axios from 'axios';

const API_URL = "http://localhost:5000/api"; 

export const handleSignup = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const handleLogin = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
