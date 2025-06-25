// apiClient.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore' // Adjust to your actual store path

const backendUrl = import.meta.env.VITE_API_BACKEND_URL

const api = axios.create({
	baseURL: backendUrl,
	timeout: 10000,
})

// 🔐 Add JWT token to headers
api.interceptors.request.use((config) => {
    const auth = useAuthStore();
    const token = auth.token;

    if (token && !auth.isValidToken) {
        auth.logout();
        return Promise.reject(new Error('Invalid token'));
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 ||
            (error.config && !useAuthStore().hasValidRole)) {
            const auth = useAuthStore();
            auth.logout();
        }
        return Promise.reject(error);
    }
);

export default api
