import axios from 'axios'

// Build a safe base URL for API calls.
// If VITE_API_URL is set, use it and append /api.
// Otherwise, default to relative /api and rely on Vite dev proxy (or same-origin) in development.
const API_BASE = import.meta.env.VITE_API_URL
const baseURL = API_BASE ? API_BASE.replace(/\/$/, '') + '/api' : '/api'

export const api = axios.create({
  baseURL,
  withCredentials: true, // send cookies for httpOnly JWT
})

// Optional: intercept 401s to redirect to login if needed
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // You could navigate to login, but we avoid side effects here.
    }
    return Promise.reject(err)
  }
)
