import axios from "./axiosConfig";

const HomeAPI = {
  // GET /home/stats -> returns site-wide stats for hero/overview cards
  getStats: async () => {
    const res = await axios.get("/home/stats");
    return res.data;
  },

  // Example: GET /home/highlights (optional future)
  getHighlights: async () => {
    const res = await axios.get("/home/highlights");
    return res.data;
  },
};

export default HomeAPI;
