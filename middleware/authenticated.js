import User from '../assets/js/api/User'

export default function ({ route, store, redirect }) {
  if (!sessionStorage.getItem('fuoye360-auth-status')) {
    return redirect('/login')
  }
  User.current()
    .then((res) => {
      store.commit('User/setUserData', res.data.data.user)
      sessionStorage.setItem('fuoye360-auth-status', true)
    })
    .then(() => {
      sessionStorage.setItem('fuoye360-auth-status', false)
    })
}
