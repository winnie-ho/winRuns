<template>
  <div id="app">
    <router-view/>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'

export default {
  components: {
    'nav-bar': navBar
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: slategrey;
}
</style>
