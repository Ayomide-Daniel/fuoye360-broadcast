import axios from 'axios'
const Api = axios.create({
  // baseURL: 'https://api.fuoye360.com/api',
  baseURL: 'http://localhost:5000/api/v1',
})
// Api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Api.defaults.withCredentials = true

if (localStorage.getItem('fuoye360-jwt') !== undefined) {
  Api.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
    'fuoye360-jwt'
  )}`
}
export default Api
