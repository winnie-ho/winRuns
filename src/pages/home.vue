<template>
  <div id='home'>
    <nav-bar></nav-bar>
    <week-activities></week-activities>
    <stat-bar></stat-bar>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import weekActivities from "../components/weekActivities.vue";
import statBar from "../components/statBar.vue";

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
    "week-activities": weekActivities,
    "stat-bar": statBar
  },
  data() {
    return {};
  },
  mounted() {
  }
};
</script>

<style scoped>
  #home {
    background-color: rgb(232, 235, 240);
    height: 100vh;
    width: 100vw;
  }
</style>
