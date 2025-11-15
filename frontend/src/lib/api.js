import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://voice-assistant-6w1f.onrender.com/api",
});

export default API;
