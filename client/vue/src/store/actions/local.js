import axios from 'axios'
export default {
  fetchMenus: () => axios.get('/v1/menus').then((response) => response.data.menus),
  fetchPosts: () => axios.get('/v1/posts').then((response) => response.data.posts)
}
