import { auth } from '@/services/fireinit.js'

export default (context) => {
  console.log('inside the fireauth plugin...');
  const {store} = context;
  
  // const {store} = context;
  console.log('store in the plugin: ' + store.toString());
  return new Promise((resolve, reject) => {
  	console.log('inside return new Promise...');
  	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    console.log('fireauth: committing to store...');
	    store.commit('SET_USER', user);
      	resolve();
	  } else {
	    // No user is signed in.
	  }
	})
  });
}