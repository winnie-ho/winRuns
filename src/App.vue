<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable import/no-unresolved */
import auth from './pages/auth/auth.vue';
import home from './pages/home/home.vue';
import parkRunMain from './pages/parkRunMain/parkRunMain.vue';
import parkRun from './pages/parkRun/parkRun.vue';
import activities from './pages/activities/activities.vue';
import parkRunActivities from './pages/parkRunActivities/parkRunActivities.vue';
import events from './pages/events/events.vue';

export default {
  components: {
    auth,
    home,
    parkRunMain,
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
@import "./styles/app-style.css";
@import "./styles/icon-style.css";
@import "./styles/app-animation-style.css";
@import "./styles/container-style.css";
@import "./styles/colour-style.css";
@import "./styles/button-style.css";
</style>
