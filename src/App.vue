<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import auth from './pages/auth/auth.vue';
import home from './pages/home/home.vue';
import parkRun from './pages/parkRun/parkRun.vue';
import activities from './pages/activities/activities.vue';
import parkRunActivities from './pages/parkRunActivities/parkRunActivities.vue';
import events from './pages/events/events.vue';

export default {
  components: {
    auth,
    home,
    parkRun,
    activities,
    parkRunActivities,
    events,
  },
  mounted() {
    this.$store.dispatch('fetchLocation');
  },
};
</script>

<style>
@import "./app-style.css";
@import "./app-animations.css";
</style>
