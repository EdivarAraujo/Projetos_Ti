import axios from 'axios'

const api = axios.create({
  baseUrl: 'http://192.168.10.102:5000/'
})

export default api
