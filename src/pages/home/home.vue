<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import weekActivities from '../../components/weekActivities/weekActivities.vue';
import weekActivitiesMini from '../../components/weekActivitiesMini/weekActivitiesMini.vue';
import weekChanger from '../../components/weekChanger/weekChanger.vue';
import triStatsSummary from '../../components/triStatsSummary/triStatsSummary.vue';
import statBar from '../../components/statBar/statBar.vue';
import bigStatTotal from '../../components/bigStatTotal/bigStatTotal.vue';
import weather from '../../components/weather/weather.vue';
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'home',
  components: {
    navBar,
    statBar,
    bigStatTotal,
    weekActivities,
    weekChanger,
    triStatsSummary,
    weekActivitiesMini,
    weather,
  },
  mixins: [renderData, appData],
  data() {
    return {
      toggleWeekView: true,
      mondayInView: '',
      weekInView: [],
    };
  },
  mounted() {
    this.$store.dispatch('fetchActivities', 15);
    this.$store.dispatch('fetchStats');
    this.$store.dispatch('fetchActivities', 200);
  },
  methods: {
    setToggleWeekView(event) {
      this.toggleWeekView = event;
    },
    setWeekInView(timeMarkers) {
      this.fetchWeekActivities(timeMarkers);
    },
    fetchWeekActivities(timeMarkers) {
      const options = {
        before: timeMarkers.before,
        after: timeMarkers.after,
        pageNumber: 1,
        activitiesPerPage: 50,
      };

      this.$store.dispatch('fetchActivitiesInPeriod', options);
    },
  },
  computed: {
    activities() {
      return this.$store.state.activities;
    },
    activitiesInWeek() {
      return this.$store.state.activitiesInPeriod;
    },
    userToken() {
      return !this.$store.state.userToken;
    },
    stats() {
      return this.$store.state.stats && {
        swim: this.$store.state.stats.ytd_swim_totals,
        ride: this.$store.state.stats.ytd_ride_totals,
        run: this.$store.state.stats.ytd_run_totals,
      };
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
