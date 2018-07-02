import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {FBASE_CONFIG} from '../config';

!firebase.apps.length ? firebase.initializeApp(FBASE_CONFIG) : ''

// if(!firebase.apps.length){
// 	firebase.initializeApp(FBASE_CONFIG);
// }
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase;