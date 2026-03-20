import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post("http://localhost:5000/auth/refresh", {
        refreshToken,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

      return axios(err.config);
    }
    return Promise.reject(err);
  }
);

export default API;