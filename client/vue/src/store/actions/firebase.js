import firebase from 'firebase';

export default {
  fetchMenus: () => {
  	
  	let db = firebase.firestore();

	const settings = {
	  timestampsInSnapshots: true
	};

	db.settings(settings);
  	return db
      .collection("menus") // we need to get menus by all users  .where("createdBy", "==", user.id)
      .get()
      .then((querySnapshot) => {
      	
      	const x = [];//querySnapshot.map((doc) => doc.data())
      	querySnapshot.forEach(function(doc) {
                  x.push(doc.data());
                });
      	return x;
      })
      .catch(function(error) {
        console.log("Error getting menus: ", error);
      });
  },
  addMenu: () => {

  },
  fetchPosts: () => []
}
