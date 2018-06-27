import local from './local'
import firebase from './firebase'
// const target = 'localhost' // can be firebase or something else in future

export default (target) => {
  switch (target) {
    case 'localhost':
      return local
    case 'firebase':
      return firebase
  }
}
