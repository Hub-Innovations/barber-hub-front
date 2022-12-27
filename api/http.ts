import axios from 'axios';

export const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

export const cepAPi = (cep: string) => {
  return `https://viacep.com.br/ws/${cep}/json/`;
};

// function getToken() {
//   return localStorage.getItem('token');
// }

// http.interceptors.request.use(
//   async function (config) {
//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
