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
  if (url.indexOf(window.location.origin) !== -1) {
    return false;
  }
  return true;
};
