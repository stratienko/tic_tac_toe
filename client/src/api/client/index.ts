import { readEnvironment } from '@/utils/env';
import { Axios } from 'axios';
import { axiosResponseParser } from '@/api/interceptors/response/response-parser';

const { VITE_API_URL } = readEnvironment(import.meta.env);

export const apiClient = new Axios({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(axiosResponseParser);
