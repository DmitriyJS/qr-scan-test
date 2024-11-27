import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wsd.autoeuro.ru/api', // базовый URL API
  timeout: 10000, // Максимальное время ожидания запроса
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
