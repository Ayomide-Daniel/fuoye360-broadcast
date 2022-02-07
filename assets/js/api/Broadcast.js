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
  async likeBroadcast(id) {
    return await Api.post('/broadcast/' + id + '/like')
  },
  async unlikeBroadcast(id) {
    return await Api.post('/broadcast/' + id + '/unlike')
  },
  async rebroadcast(id) {
    return await Api.post('/broadcast/' + id + '/rebroadcast')
  },
  async undoRebroadcast(id) {
    return await Api.post('/broadcast/' + id + '/undorebroadcast')
  },
  async addToBookmarks(id) {
    return await Api.post('/broadcast/' + id + '/add-bookmark')
  },
  async removeFromBookmarks(id) {
    return await Api.post('/broadcast/' + id + '/remove-bookmark')
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
