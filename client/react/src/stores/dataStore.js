import { store } from 'react-easy-state';

const dataStore = store({
  posts: [],
  menus: [],
  query: [],
  deletePost(post) {
    const index = dataStore.posts.indexOf(post);
    if (index !== -1) {
      dataStore.posts.splice(index, 1);
    }
  },
  getFilteredPosts() {
    const { posts, query } = dataStore;
    if (query.length === 0) {
      return posts;
    }
    return posts.filter(
      post =>
        post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        ((post.content
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1 ||
          post.tags
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1 ||
          post.author
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1) &&
          !(post.pageURL && post.pageURL.length))
    );
  },
});

export default dataStore;
