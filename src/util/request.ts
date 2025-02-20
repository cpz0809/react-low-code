import { TOKEN } from '@/constant/util'
import axios, { InternalAxiosRequestConfig } from 'axios'
import AuthMethods from '@/components/auth-expire-tips/AuthMethods.tsx'
import { message } from 'antd'

export const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(async (res) => {
  if (res.data.code === 200) return res.data.data
  if (res.data.code === 403) {
    AuthMethods()
    return
  }
  if (res.data.code === 400 || res.data.code > 10000) {
    message.error(res.data.message)
    return Promise.reject(res.data.message)
  }
  return res.data
})
