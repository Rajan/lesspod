import Vue from 'vue'
import moment from 'moment'



if (!Vue.prototype.hasOwnProperty('$moment')) {
  Object.defineProperty(Vue.prototype, '$moment', {
    get() {
      return moment
    }
  })
}

