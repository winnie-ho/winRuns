<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import home from './pages/home/home.vue'
import runClub from './pages/runClub/runClub.vue'
import parkRun from './pages/parkRun/parkRun.vue'
import activities from './pages/activities/activities.vue'
import parkRunActivities from './pages/parkRunActivities/parkRunActivities.vue'

export default {
  components: {
    'home': home,
    'runClub': runClub,
    'parkRun': parkRun,
    'activities': activities,
    'parkRunActivities': parkRunActivities
  },
  name: 'App',
  created () {
    this.$store.dispatch('fetchAthlete')
    this.$store.dispatch('fetchActivities')
    this.$store.dispatch('fetchStats')
    this.$store.dispatch('fetchWeatherNow')
    this.$store.dispatch('fetchWeatherForecast')
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
  @import './app-style.css'
</style>
