// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { store } from './store/store'
import xml2js from 'xml2js'
import * as fs from 'fs-web'
// import * as VueGoogleMaps from 'vue2-google-maps'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCxXMhBSrjeLubVwNJzRAFZedtQGdiCqiI'
//   }
// })

Vue.use(VueResource)
Vue.use(xml2js)
Vue.use(fs)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
