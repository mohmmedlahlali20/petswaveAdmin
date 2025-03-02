import axios from "axios";

const path = axios.create({
    baseURL: import.meta.env.VITE_NEST_API_URL,
});

path.interceptors.request.use(
  async function (config) {
    if (config.data) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default path;