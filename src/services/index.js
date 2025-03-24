import axios from "axios";
const BACKEND_URL = ""
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