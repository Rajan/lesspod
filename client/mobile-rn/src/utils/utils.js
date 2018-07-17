import faker from 'faker';
import { Alert } from 'react-native';

import { addPostToFirebase } from '../api/firebase';
import userStore from '../stores/userStore';

export const showAlert = (message, type) => {
  Alert.alert(type && type.toUpperCase, message, [{ text: 'OK' }]);
};

export const generateFakePosts = count => {
  for (let i = 0; i < count; i++) {
    const postData = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      tags: faker.lorem.words(),
      author: `${userStore.profileData.first} ${userStore.profileData.last}`,
    };
    addPostToFirebase(postData);
  }
};

export const dashedString = str =>
  str
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();

export const isExternalLink = url => {
  if (url.startsWith('http') || url.startsWith('www')) {
    return true;
  }
  return false;
};

export const formatURL = url => {
  if (!url.startsWith('www') || !url.startsWith('http')) {
    return `http://${url}`;
  }
  return url;
};
