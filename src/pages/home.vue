<template>
  <div id='home'>
    <nav-bar v-bind:pageTitle='pageTitle'></nav-bar>
    <week-activities></week-activities>
  </div>
</template>

<script>
import navBar from "../components/navBar/navBar.vue";
import weekActivities from "../components/weekActivities/weekActivities.vue";

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
    "week-activities": weekActivities,
  },
  data() {
    return {
      pageTitle: 'HOME'
    };
  },
  mounted() {
  }
};
</script>

<style scoped>
  #home {
    background-color: #6D9DC5;
    height: 100vh;
    width: 100vw;
  }
</style>
