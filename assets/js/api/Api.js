import axios from 'axios'
const Api = axios.create({
  // baseURL: 'https://api.fuoye360.com/api',
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'https://fuoye360-node-api.herokuapp.com/',
})

if (sessionStorage.getItem('fuoye360-jwt') !== undefined) {
  Api.defaults.headers.Authorization = `Bearer ${sessionStorage.getItem(
    'fuoye360-jwt'
  )}`
}
export default Api
