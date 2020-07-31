import axios from 'axios'

// const baseURL = "http://192.168.0.180:3333"
const baseURL = "https://watersonbackend-chipper-genet-kv.mybluemix.net"

const api = axios.create({
  baseURL
})

export default api