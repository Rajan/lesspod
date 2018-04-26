// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navbar from './components/Navbar'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Navbar },
  template: `
  <div>
    <Navbar />
    <section class="section">
      <div class="container is-fluid">
      </div>
    </section>
  </div>
  `
})
