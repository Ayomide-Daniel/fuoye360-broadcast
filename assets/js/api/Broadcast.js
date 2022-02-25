import Api from './Api'

export default {
  async getBroadcasts() {
    return await Api.get('/broadcast')
  },
  async viewThread(id) {
    return await Api.get('/broadcast/thread/' + id)
  },
  async bookmarks() {
    return await Api.get('/broadcast/bookmarks')
  },
  async uploadImage(fd) {
    return await Api.post('/broadcast/upload-image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  async createBroadcast(fd) {
    return await Api.post('/broadcast', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  async deleteBroadcast(data) {
    return await Api.delete('/broadcast', data)
  },
  async createComment(fd) {
    return await Api.post('/broadcast/comment', fd)
  },

  async getUserBroadcasts(data) {
    return await Api.get(`/broadcast/user/${data.user_id}`)
  },
}
