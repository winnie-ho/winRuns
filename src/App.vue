<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import home from './pages/home.vue'

export default {
  components: {
    'home': home
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: -8px;
}
</style>
