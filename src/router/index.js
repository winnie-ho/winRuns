import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import runclub from '../pages/runclub.vue'
import parkrun from '../pages/parkrun.vue'
import activities from '../pages/activities.vue'
import viewActivity from '../pages/viewActivity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/runclub', component: runclub },
    { path: '/parkrun', component: parkrun },
    { path: '/activities', component: activities },
    { path: '/activity/:id', component: viewActivity }
  ],
  mode: 'history'
})
