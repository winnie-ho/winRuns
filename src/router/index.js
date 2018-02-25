import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import runclub from '../pages/runclub.vue'
import parkrun from '../pages/parkrun.vue'
import runs from '../pages/runs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/runclub', component: runclub },
    { path: '/parkrun', component: parkrun },
    { path: '/runs', component: runs }
  ],
  mode: 'history'
})
