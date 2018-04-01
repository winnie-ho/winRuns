<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import home from './pages/home.vue'
import runclub from './pages/runclub.vue'
import parkrun from './pages/parkrun.vue'
import activities from './pages/activities.vue'

export default {
  components: {
    'home': home,
    'runclub': parkrun,
    'parkrun': parkrun,
    'activities': activities
  },
  name: 'App',
  created () {
    this.$store.dispatch('fetchActivities')
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
