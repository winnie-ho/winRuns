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
  methods: {
  },
  computed: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: -8px;
}
</style>
