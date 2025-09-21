import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true, // Important for cookies
})

client.interceptors.request.use((config) => {
  // Optionally attach auth token here
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    // Centralized error handling
    return Promise.reject(err)
  }
)

export default client
