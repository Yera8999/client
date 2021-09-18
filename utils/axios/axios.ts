import axios from "axios";
export const axiosJWT = axios.create();
axiosJWT.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        return axios.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН", e);
      }
    }
    throw error;
  }
);
