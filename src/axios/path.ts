import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const path = axios.create({
    baseURL: import.meta.env.VITE_NEST_API_URL,
});

path.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('token');

        if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            let hasFile = false;

            for (const value of config.data.values() as FormDataIterator<unknown>) {
                if (value instanceof File || (value instanceof Blob && value.type)) {
                    hasFile = true;
                    break;
                }
            }
            if (hasFile) {
                config.headers['Content-Type'] = 'multipart/form-data';
            } else {
                config.headers['Content-Type'] = 'application/json';
            }
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
);

export default path;
