<template src='./home.html'></template>
<style scoped src='./home.css'></style>

<script>
import cap from '../../components/cap/cap.vue';
import weekActivities from '../../components/weekActivities/weekActivities.vue';
import weekActivitiesMini from '../../components/weekActivitiesMini/weekActivitiesMini.vue';
import weekChanger from '../../components/weekChanger/weekChanger.vue';
import triStatsSummary from '../../components/triStatsSummary/triStatsSummary.vue';
import triStatsBar from '../../components/triStatsBar/triStatsBar.vue';
import yearStats from '../../components/yearStats/yearStats.vue';
import bigStatTotal from '../../components/bigStatTotal/bigStatTotal.vue';
import weather from '../../components/weather/weather.vue';
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'home',
  components: {
    cap,
    yearStats,
    bigStatTotal,
    weekActivities,
    weekChanger,
    triStatsSummary,
    triStatsBar,
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
    this.$store.dispatch('fetchStats');
    this.$store.dispatch('fetchHRZones');
    this.$store.dispatch('fetchFixedStartDate');
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
        activitiesPerPage: 50,
        pageRequests: 1,
      };

      this.$store.dispatch('fetchActivitiesInPeriod', options);
    },
  },
  computed: {
    activitiesInWeek() {
      return this.$store.state.activitiesInPeriod;
    },
    userToken() {
      return !this.$store.state.userToken;
    },
  },
};
</script>
