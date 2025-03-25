import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = "http://3.111.39.130/api/v1/"
const REMOTIVE_API_URL = 'https://remotive.com/api/remote-jobs/categories';

export const fetchJobCategories = async () => {
  try {
    const response = await axios.get(REMOTIVE_API_URL)
    if (!response.status === 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("response", response)
    return response.data.jobs; 
  } catch (error) {
    console.error('Error fetching job categories:', error);
    throw error; 
  }
};

export const login = async ({ email, password }) => {
  try {
    const url = BACKEND_URL + "auth/login";
    const response = await axios.post(url, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      toast.error(data.message || 'Login failed');
    } else if (error.request) {
      toast.error('No response from server. Please try again.');
    } else {
      toast.error('Login request failed. Please try again.');
    }
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const url = BACKEND_URL + "auth/register";
    const response = await axios.post(url, { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      toast.error(data.message || 'Registration failed');
    } else if (error.request) {
      toast.error('No response from server. Please try again.');
    } else {
      toast.error('Registration request failed. Please try again.');
    }
  }
};

export const uploadResume = async (resumeData) => {
  try {
    const formData = new FormData();
    formData.append('resume', resumeData.file);
    formData.append('domain', resumeData.domain);

    const response = await axios.post(`${BACKEND_URL}resume/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchJobRecommendations = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}resume/recommendations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    console.log("response", response)
    return response.data;
  } catch (error) {
    console.error('Error fetchJobRecommendations:', error.response ? error.response.data : error.message);
    throw error;
  }
};