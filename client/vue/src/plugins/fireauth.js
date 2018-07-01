import { auth } from '@/services/fireinit.js';

export default (context) => {
  const {store} = context;

  return new Promise((resolve, reject) => {
  	auth.onAuthStateChanged(function(user) {
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