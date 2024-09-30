import { readEnvironment } from '@/utils/env';
import axios from 'axios';

const { VITE_API_URL } = readEnvironment(import.meta.env);

/**
 * Axios instance for API requests
 * @see https://axios-http.com/docs/instance
 * @see https://axios-http.com/docs/interceptors
 */
export const apiClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
