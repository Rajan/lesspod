// import { auth } from '@/services/fireinit.js'
import firebase from 'firebase'

export default (context) => {
  console.log('inside the fireauth plugin...')
  const {store} = context

  // const {store} = context;
  console.log('store in the plugin: ' + store.toString())
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user, err) {
      if (user) {
        // User is signed in.
        console.log('fireauth: committing to store...')
        store.commit('SET_USER', user)
        resolve()
      } else {
        resolve() // No user
        // No user is signed in.
      }
    })
  })
}
