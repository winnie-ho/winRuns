<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import weekActivities from "../../components/weekActivities/weekActivities.vue";

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

