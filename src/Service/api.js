import axios from 'axios'

const api = axios.create({
  baseURL: `http://${
    process.env.NODE_ENV != 'production' ? '127.0.0.1' : '192.168.0.11'
  }:5000`
})

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export default api
