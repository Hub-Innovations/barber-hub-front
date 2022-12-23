import axios from 'axios';

export const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

export const cepAPi = (cep: string) => {
  return `https://viacep.com.br/ws/${cep}/json/`;
};
