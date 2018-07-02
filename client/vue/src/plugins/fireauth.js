import firebase from 'firebase';
import store from '../store';
export default () => {
  // const {store} = context;

  return new Promise((resolve, reject) => {
  	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    store.commit('SET_USER', user);
      	resolve();
	  } else {
	    // No user is signed in.
	  }
	})
  })
}