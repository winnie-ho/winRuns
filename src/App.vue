<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import auth from "./pages/auth/auth.vue";
import home from "./pages/home/home.vue";
import swim from "./pages/swim/swim.vue";
import parkRun from "./pages/parkRun/parkRun.vue";
import activities from "./pages/activities/activities.vue";
import parkRunActivities from "./pages/parkRunActivities/parkRunActivities.vue";

export default {
  components: {
    auth: auth,
    home: home,
    swim: swim,
    parkRun: parkRun,
    activities: activities,
    parkRunActivities: parkRunActivities
  },
  name: "App",
  mounted() {
    this.$store.dispatch("fetchWeatherNow");
    this.$store.dispatch("fetchWeatherForecast");
  },
  methods: {},
  computed: {}
};
</script>

<style>
@import "./app-style.css";
@import "./app-animations.css";
</style>
