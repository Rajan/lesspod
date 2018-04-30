import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Newpost from '@/components/Newpost'
import Posts from '@/components/Posts'

Vue.use(Router)
Vue.use(require('vue-moment'));
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/newpost',
      name: 'Newpost',
      component: Newpost
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
