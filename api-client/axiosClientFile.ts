import axios from 'axios'

const axiosClientFile = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export default axiosClientFile
