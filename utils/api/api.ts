import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 400:
          console.log('❌ Bad Request: Invalid request')
          break;
        case 401:
          // clearToken()
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('❌ Forbidden: Access denied')
          break
        case 404:
          console.error('❌ Not Found: Resource not available')
          break
        case 500:
          console.error('❌ Server Error: Internal server error')
          break
        default:
          console.error(`❌ API Error: ${status}`, data)
      }
    } else if (error.request) {
      console.error('❌ Network Error: No response received')
    } else {
      console.error('❌ Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api
