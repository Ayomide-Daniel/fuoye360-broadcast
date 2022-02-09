import Api from './Api'

export default {
  async getBroadcasts() {
    return await Api.get('/broadcast')
  },
  async viewThread(id) {
    return await Api.get('/broadcast/thread/' + id)
  },
  async bookmarks() {
    return await Api.get('/broadcast/bookmark')
  },
  async uploadImage(fd) {
    return await Api.post('/broadcast/upload-image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  async createBroadcast(fd) {
    return await Api.post('/broadcast', fd, {
      // headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  async createComment(fd) {
    return await Api.post('/broadcast/comment', fd)
  },
}
