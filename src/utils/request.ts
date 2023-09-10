import axios from 'axios'

const request = axios.create({
  // timeout: 5000
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(response => {
  const data = response.data
  if (response.status !== 200) {
    return Promise.reject(data)
  }
  return response.data
})

export default request
