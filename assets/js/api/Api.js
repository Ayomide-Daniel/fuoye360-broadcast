import axios from 'axios'
const Api = axios.create({
  baseURL: process.env.API_BASE_URL,
})

if (sessionStorage.getItem('fuoye360-jwt') !== undefined) {
  Api.defaults.headers.Authorization = `Bearer ${sessionStorage.getItem(
    'fuoye360-jwt'
  )}`
}
export default Api
