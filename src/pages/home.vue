<template>
  <div id='home'>
    <nav-bar></nav-bar>
    <stat-bar></stat-bar>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import statBar from "../components/statBar.vue";

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
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

</style>
