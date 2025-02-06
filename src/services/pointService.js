import axios from "axios";

const API_URL = "https://udc2a59ldf.execute-api.us-east-1.amazonaws.com/prod/PointsAPI2";

const PointService = {
  // 📌 1️⃣ Get Points (With Optional Search)
  async getPoints({ searchTerm }) {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: searchTerm ? { search: searchTerm } : {},
      });
      return response;
    } catch (error) {
      console.error("Error fetching points:", error);
      throw error;
    }
  },

  // 📌 2️⃣ Add a New Point
  async addPoint(point) {
    try {
      const response = await axios.post(`${API_URL}`, point);
      console.log("Point added:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding point:", error);
      throw error;
    }
  },

  // 📌 3️⃣ Delete a Point by ID
  async deletePoint(id) {
    try {
      const response = await axios.delete(`${API_URL}`, {
        params: { id },
      });

      console.log("Point deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting point:", error);
      throw error;
    }
  },
};

export default PointService;
