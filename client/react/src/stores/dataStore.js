import { store } from 'react-easy-state';

const dataStore = store({
  posts: [],
  menus: [],
  deletePost(post) {
    const index = dataStore.posts.indexOf(post);
    if (index !== -1) {
      dataStore.posts.splice(index, 1);
    }
  },
});

export default dataStore;
