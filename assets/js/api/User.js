import Api from './Api'
// import Csrf from './Csrf'
export default {
  register(form) {
    return Api.post('/register', form)
  },
  googleOauth(data) {
    return Api.post('/oauth/google', data)
  },
  login(form) {
    // await Csrf.getCookie(true)
    return Api.post('/login', form)
  },
  logout() {
    return Api.post('/logout')
  },
  current() {
    return Api.get('/user')
  },

  updateProfile(fd) {
    return Api.patch('/user/update', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  findByUsername(username) {
    return Api.get(`/user/${username}`)
  },
  sendPasswordResetLink(form) {
    return Api.post('/password/email', form)
  },
  resetPassword(form) {
    return Api.post('/password/reset', form)
  },
  getThisUser(name) {
    return Api.get(`/account/${name}`)
  },
  getFollowers(id) {
    return Api.get(`/account/${id}/follower`)
  },
  getFollowing(id) {
    return Api.get(`/account/${id}/following`)
  },
  async uploadImage(fd) {
    return await Api.post('/user/upload-image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
