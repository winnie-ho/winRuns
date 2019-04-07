import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home/home.vue'
import auth from '../pages/auth/auth.vue'
import swim from '../pages/swim/swim.vue'
import parkRun from '../pages/parkRun/parkRun.vue'
import activities from '../pages/activities/activities.vue'
import viewActivity from '../pages/viewActivity/viewActivity.vue'
import parkRunActivities from '../pages/parkRunActivities/parkRunActivities.vue'
import parkRunSplits from '../pages/parkRunSplits/parkRunSplits.vue'
import kmSplits from '../pages/kmSplits/kmSplits.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: auth },
    { path: '/home', component: home },
    { path: '/swim', component: swim },
    { path: '/parkRun', component: parkRun },
    { path: '/activities', component: activities },
    { path: '/activity/:id', component: viewActivity },
    { path: '/parkRunActivities', component: parkRunActivities },
    { path: '/parkRunSplits', component: parkRunSplits },
    { path: '/kmSplits', component: kmSplits }
  ],
  mode: 'history'
})
