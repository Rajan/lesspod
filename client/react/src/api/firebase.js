import firebase from 'firebase';
import uuidv4 from 'uuid/v4';
import dayjs from 'dayjs';
import { USERS_COLLECTION, POSTS_COLLECTION } from '../config/Constants';

export const logout = () => {
  firebase.auth().signOut();
};

export const loginWithFirebase = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      const response = {
        error: null,
        data,
      };
      return response;
    })
    .catch(error => {
      const response = {
        error,
        data: null,
      };
      return response;
    });

export const registerWithFirebase = (email, password) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        const response = {
          error: null,
          data: user,
        };
        return response;
      },
      error => {
        const response = {
          error,
          data: null,
        };
        return response;
      }
    );

export const addUserProfileToFbase = data => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });

  data.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ms Z');
  data.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ms Z');

  return db
    .collection(USERS_COLLECTION)
    .doc(data.id) // documentId is same as userId; firebase security rules
    .set(data)
    .then(() => {
      const response = {
        error: null,
        data,
      };
      return response;
    })
    .catch(error => {
      const response = {
        error,
        data: null,
      };
      return response;
    });
};

export const getUserProfileFromFbase = id => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
  return db
    .collection(USERS_COLLECTION)
    .doc(id)
    .get()
    .then(doc => {
      const response = {
        error: null,
        data: doc.data(),
      };
      return response;
    })
    .catch(error => {
      const response = {
        error,
        data: null,
      };
      return response;
    });
};

export const addDataToFbase = (collection, data) => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });

  const generatedId = uuidv4();

  data.id = generatedId;
  data.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ms Z');
  data.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ms Z');

  return db
    .collection(collection)
    .doc(generatedId)
    .set(data)
    .then(() => {
      const response = {
        error: null,
        data: 'success',
      };
      return response;
    })
    .catch(error => {
      const response = {
        error,
        data: null,
      };
      return response;
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
