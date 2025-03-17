import axios from "axios";
import Cookies from 'js-cookie';

const path = axios.create({
  baseURL: import.meta.env.VITE_NEST_API_URL,
});

path.interceptors.request.use(
  async function (config) {
    const token = Cookies.get('token');

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

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
