import alertify from 'alertify.js';
import faker from 'faker';

import { addPostToFirebase } from '../api/firebase';
import userStore from '../stores/userStore';

export const showAlert = (message, type) => {
  if (type === 'success') {
    alertify.success(message);
  } else if (type === 'error') {
    alertify.error(message);
  } else {
    alertify.log(message);
  }
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
