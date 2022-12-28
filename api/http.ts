import axios from 'axios';
import ToastALert from 'components/Alerts/ToastAlert';

export const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

export const cepAPi = (cep: string) => {
  return `https://viacep.com.br/ws/${cep}/json/`;
};

function getToken() {
  return localStorage.getItem('token');
}

// function setUnauthorizedErrorLocalStorage() {
//   localStorage.setItem('unauthorized', 'true');

//   localStorage.setItem('unauthorized', 'false');
// }

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errStatus = error.response.data.statusCode;
    const errMessage = error.response.data.message;

    if (errStatus === 401 && errMessage === 'Unauthorized') {
      window.location.href = '/login';
      localStorage.setItem('unauthorized', 'true');
    }
    return Promise.reject(error);
  }
);
