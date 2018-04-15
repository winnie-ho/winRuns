<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import weekActivities from "../../components/weekActivities/weekActivities.vue";
import weekChanger from "../../components/weekChanger/weekChanger.vue";
import statBar from "../../components/statBar.vue";
import renderData from '../../mixins/renderData.js'

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
    "stat-bar": statBar,
    "week-activities": weekActivities,
    "week-changer": weekChanger,
  },
  mixins: [ renderData ],
  data() {
    return {
      pageTitle: 'HOME',
      toggleWeekView: true,
      weekInViewIndex: 0
    };
  },
  mounted() {
  },
  methods: {
    setToggleWeekView: function() {
      console.log("TOGGLE STATUS")
      this.toggleWeekView = !this.toggleWeekView
    },
    setWeekInViewIndex: function (weekInViewIndex) {
      this.weekInViewIndex=weekInViewIndex
      console.log("WEEK IN VIEW INDEX", this.weekInViewIndex )
    }
  },
  computed: {
    activities: function () {
      if (!this.$store.state.activities) return;
      return this.$store.state.activities;
    },
    weatherNowTemp: function () {
      if (!this.$store.state.weatherNow.main) return
      return this.$store.state.weatherNow.main.temp
    },
    weatherNowMain: function () {
      if (!this.$store.state.weatherNow.weather) return
      return this.$store.state.weatherNow.weather[0].main
    }
  }
};
</script>

