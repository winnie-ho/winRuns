<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import weekActivities from "../../components/weekActivities/weekActivities.vue";
import statBar from "../../components/statBar.vue";
import renderData from '../../mixins/renderData.js'

export default {
  name: "home",
  components: {
    "nav-bar": navBar,
    "stat-bar": statBar,
    "week-activities": weekActivities,
  },
  mixins: [ renderData ],
  data() {
    return {
      pageTitle: 'HOME',
      toggleWeekView: true
    };
  },
  mounted() {
  },
  computed: {
    weatherNowTemp: function() {
      if (!this.$store.state.weatherNow.main) return
      return this.$store.state.weatherNow.main.temp
    },
    weatherNowMain: function (){
      if (!this.$store.state.weatherNow.weather) return
      return this.$store.state.weatherNow.weather[0].main
    }
  }
};
</script>

