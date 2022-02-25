export default function ({ route, store, redirect }) {
  if (sessionStorage.getItem('fuoye360-auth-status') === true) {
    return redirect('/')
  }
}
