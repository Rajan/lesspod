import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0fd430f8 = () => import('../../../src/pages/Viewpost.vue' /* webpackChunkName: "pages/Viewpost" */).then(m => m.default || m)
const _4c64db54 = () => import('../../../src/pages/Page2.vue' /* webpackChunkName: "pages/Page2" */).then(m => m.default || m)
const _98770f8c = () => import('../../../src/pages/Login.vue' /* webpackChunkName: "pages/Login" */).then(m => m.default || m)
const _33097d9c = () => import('../../../src/pages/App.vue' /* webpackChunkName: "pages/App" */).then(m => m.default || m)
const _4da87064 = () => import('../../../src/pages/Page.vue' /* webpackChunkName: "pages/Page" */).then(m => m.default || m)
const _4c72f2d5 = () => import('../../../src/pages/Page3.vue' /* webpackChunkName: "pages/Page3" */).then(m => m.default || m)
const _7ab3fe62 = () => import('../../../src/pages/Register.vue' /* webpackChunkName: "pages/Register" */).then(m => m.default || m)
const _1c31bf6a = () => import('../../../src/pages/post/_id.vue' /* webpackChunkName: "pages/post/_id" */).then(m => m.default || m)
const _72aab543 = () => import('../../../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/Viewpost",
			component: _0fd430f8,
			name: "Viewpost"
		},
		{
			path: "/Page2",
			component: _4c64db54,
			name: "Page2"
		},
		{
			path: "/Login",
			component: _98770f8c,
			name: "Login"
		},
		{
			path: "/App",
			component: _33097d9c,
			name: "App"
		},
		{
			path: "/Page",
			component: _4da87064,
			name: "Page"
		},
		{
			path: "/Page3",
			component: _4c72f2d5,
			name: "Page3"
		},
		{
			path: "/Register",
			component: _7ab3fe62,
			name: "Register"
		},
		{
			path: "/post/:id?",
			component: _1c31bf6a,
			name: "post-id"
		},
		{
			path: "/",
			component: _72aab543,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
