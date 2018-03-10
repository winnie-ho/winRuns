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

.row{
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.col{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.col-left{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-start;
}

.sb{
  justify-content: space-between;
}

.sa{
  justify-content: space-around;
}

/* TEXT */
.heading {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 18px;
  margin: 2px;
  /* color: white; */
}

.subheading {
  font-family: sans-serif;
  font-size: 12px;
  margin: 2px;
  color: white;
}

.date{
  text-align: right;
  font-size: 16px;
}

.data-metric{
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  height: 35px;
  max-width: auto;
}

/* IMAGES */
.icon{
  height: 20px;
  width: auto;
  margin: 0 5px;
  cursor: pointer;
}

.dark-icon {
  filter: invert(60%);
}

.avatar{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

/* BUTTONS */
.hover:hover {
  color: #3E9FDF;
}

.nav-icon {
  width: auto;
  height: 30px;
  margin: 0 5px;
  padding-top: 5px;
}

.nav-icon:hover {
  transform: scale(1.1);
}
</style>
