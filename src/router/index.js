import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home/home.vue'
import runClub from '../pages/runClub/runClub.vue'
import parkrun from '../pages/parkrun.vue'
import activities from '../pages/activities/activities.vue'
import viewActivity from '../pages/viewActivity/viewActivity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/runClub', component: runClub },
    { path: '/parkrun', component: parkrun },
    { path: '/activities', component: activities },
    { path: '/activity/:id', component: viewActivity }
  ],
  mode: 'history'
})
