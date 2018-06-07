import firebase from 'firebase';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { USERS_COLLECTION, POSTS_COLLECTION } from '../config/Constants';

export const logout = () => {
  console.log('clicked');
  firebase.auth().signOut();
};

export const addDataToFbase = (collection, data, successCallback, errorCallback) => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });

  const generatedId = uuidv4();

  data.id = generatedId;
  data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');
  data.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

  db
    .collection(collection)
    .doc(generatedId) // documentId is same as id; easier for future referencing of document
    .set(data)
    .then(() => {
      console.log('data added successfully');
      successCallback(data);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      errorCallback(error);
    });
};

export const updateDataInFbase = (collection, documentId, data, successCallback, errorCallback) => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
  db
    .collection(collection)
    .doc(documentId)
    .update(data)
    .then(docRef => {
      successCallback(data);
    })
    .catch(error => {
      errorCallback(error);
      console.error('Error updating Profile: ', error);
    });
};

export const getUserDataFromFbase = (email, successCallback, errorCallback) => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
  db
    .collection(USERS_COLLECTION)
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {
      const userData = querySnapshot.docs[0].data();
      successCallback(userData);
    })
    .catch(error => {
      console.log('Error getting user details: ', error);
      errorCallback(error);
    });
};

export const getAllPostsByUser = (userId, successCallback, errorCallback) => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
  db
    .collection(POSTS_COLLECTION)
    .where('createdBy', '==', userId)
    .get()
    .then(querySnapshot => {
      const posts = [];
      querySnapshot.forEach(doc => {
        posts.push(doc.data());
      });
      successCallback(posts);
    })
    .catch(error => {
      console.log('Error getting user details: ', error);
      errorCallback(error);
    });
};
