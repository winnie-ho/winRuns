<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import weekActivities from "../../components/weekActivities/weekActivities.vue";
import weekActivitiesMini from "../../components/weekActivitiesMini/weekActivitiesMini.vue";
import weekChanger from "../../components/weekChanger/weekChanger.vue";
import weekStats from "../../components/weekStats/weekStats.vue";
import statBar from "../../components/statBar.vue";
import weather from "../../components/weather/weather.vue";
import renderData from '../../mixins/renderData.js'

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
    "stat-bar": statBar,
    "week-activities": weekActivities,
    "week-changer": weekChanger,
    "week-stats": weekStats,
    "week-activities-mini": weekActivitiesMini,
    "weather": weather
  },
  mixins: [ renderData ],
  data() {
    return {
      pageTitle: 'HOME',
      toggleWeekView: true,
      mondayInView: '',
      weekInView: [],
    };
  },
  mounted() {
    this.$store.dispatch('fetchActivities');
    this.$store.dispatch('fetchStats')
  },
  methods: {
    setToggleWeekView: function() {
      console.log("TOGGLE STATUS")
      this.toggleWeekView = !this.toggleWeekView
    },
    setMondayInView: function (mondayInView) {
      this.mondayInView = mondayInView;
    },
    setWeekInView: function(weekInView) {
      this.weekInView = weekInView;
    },
    setToggleWeekView: function(toggleWeekView) {
      this.toggleWeekView = toggleWeekView;
    }
  },
  computed: {
    activities: function () {
      if (!this.$store.state.activities) return;
      return this.$store.state.activities;
    },
    userToken: function () {
      let result = !this.$store.state.userToken;
      return result;
    }
  }
};
</script>

