<template>
  <div id="app">
    <router-view/>
    <nav-bar></nav-bar>
    <stat-total></stat-total>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import statTotal from './components/statTotal.vue'

export default {
  components: {
    'nav-bar': navBar,
    'stat-total': statTotal
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
