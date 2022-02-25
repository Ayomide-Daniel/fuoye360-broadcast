import Api from './Api'

export default {
  async likeBroadcast(data) {
    return await Api.post('/analytics/like-broadcast', data)
  },
  async unlikeBroadcast(data) {
    return await Api.delete('/analytics/like-broadcast', data)
  },
  async rebroadcast(data) {
    return await Api.post('/analytics/rebroadcast', data)
  },
  async undoRebroadcast(data) {
    return await Api.delete('/analytics/rebroadcast', data)
  },
  async addToBookmarks(data) {
    return await Api.post('/analytics/bookmark', data)
  },
  async removeFromBookmarks(data) {
    return await Api.delete('/analytics/bookmark', data)
  },
  async followUser(data) {
    return await Api.post('/analytics/follow', data)
  },

  async unfollowUser(data) {
    return await Api.delete('/analytics/follow', data)
  },
}
