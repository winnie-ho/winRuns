<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import weekActivities from "../../components/weekActivities/weekActivities.vue";
import weekActivitiesMini from "../../components/weekActivitiesMini/weekActivitiesMini.vue";
import weekChanger from "../../components/weekChanger/weekChanger.vue";
import weekStats from "../../components/weekStats/weekStats.vue";
import statBar from "../../components/statBar/statBar.vue";
import weather from "../../components/weather/weather.vue";
import renderData from "../../mixins/renderData.js";

export default {
  name: "home",
  components: {
    navBar,
    statBar,
    weekActivities,
    weekChanger,
    weekStats,
    weekActivitiesMini,
    weather
  },
  mixins: [renderData],
  data() {
    return {
      toggleWeekView: false,
      mondayInView: "",
      weekInView: []
    };
  },
  mounted() {
    this.$store.dispatch("fetchActivities", 15);
    this.$store.dispatch("fetchStats");
    this.$store.dispatch("fetchActivities", 200);
    this.$store.dispatch("fetchEvents");
  },
  methods: {
    setToggleWeekView(event) {
      this.toggleWeekView = event;
    },
    setMondayInView(mondayInView) {
      this.mondayInView = mondayInView;
    },
    setWeekInView(weekInView) {
      this.weekInView = weekInView;
    }
  },
  computed: {
    activities() {
      if (!this.$store.state.activities) return;
      return this.$store.state.activities;
    },
    userToken() {
      let result = !this.$store.state.userToken;
      return result;
    }
  }
};
</script>

