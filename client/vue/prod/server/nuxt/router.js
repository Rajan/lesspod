import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _107b76ec = () => import('../../../src/pages/Page3.vue' /* webpackChunkName: "pages/Page3" */).then(m => m.default || m)
const _40082c50 = () => import('../../../src/pages/Navbar.vue' /* webpackChunkName: "pages/Navbar" */).then(m => m.default || m)
const _939841ee = () => import('../../../src/pages/App.vue' /* webpackChunkName: "pages/App" */).then(m => m.default || m)
const _77ccfc51 = () => import('../../../src/pages/Login.vue' /* webpackChunkName: "pages/Login" */).then(m => m.default || m)
const _106d5f6b = () => import('../../../src/pages/Page2.vue' /* webpackChunkName: "pages/Page2" */).then(m => m.default || m)
const _36b3395a = () => import('../../../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			path: "/Page3",
			component: _107b76ec,
			name: "Page3"
		},
		{
			path: "/Navbar",
			component: _40082c50,
			name: "Navbar"
		},
		{
			path: "/App",
			component: _939841ee,
			name: "App"
		},
		{
			path: "/Login",
			component: _77ccfc51,
			name: "Login"
		},
		{
			path: "/Page2",
			component: _106d5f6b,
			name: "Page2"
		},
		{
			path: "/",
			component: _36b3395a,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
