import firebase, {auth, GoogleProvider} from '@/services/fireinit.js'

//import firebase from 'firebase';


export default {
  fetchMenus: () => {
    let db = firebase.firestore()
    const settings = {
      timestampsInSnapshots: true
    }
    db.settings(settings)
    return db
      .collection('menus') // we need to get menus by all users  .where("createdBy", "==", user.id)
      .get()
      .then((querySnapshot) => {
        const x = []// querySnapshot.map((doc) => doc.data())
        querySnapshot.forEach(function (doc) {
          x.push(doc.data())
        })
        return x
      })
      .catch(function (error) {
        console.log('Error getting menus: ', error)
      })
  },
  addMenu: () => {

  },
  fetchPosts: () => {
    let db = firebase.firestore()
    const settings = {
      timestampsInSnapshots: true
    }
    db.settings(settings)
    return db
      .collection('posts')
      .get()
      .then(function (querySnapshot) {
        let posts1 = []
        querySnapshot.forEach(function (doc) {
          posts1.push(doc.data())
        })
        for (var i in posts1) {
          if (posts1[i].pageURL && posts1[i].pageURL.length !== 0) {
            posts1.splice(i, 1)
          }
        }
        return posts1
      })
      .catch(function (error) {
        console.log('Error getting posts: ', error)
      })
  }
}
