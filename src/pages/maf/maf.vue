<template src='./maf.html'></template>
<style scoped src='./maf.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import dateRangeSelector from '../../components/dateRangeSelector/dateRangeSelector.vue';
import activityItem from '../../components/activityItem/activityItem.vue';
import hrZones from '../../components/hrZones/hrZones.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import avgHRPaceChart from '../../mixins/avgHRPaceChart';

export default {
  name: 'maf',
  components: {
    navBar,
    dateRangeSelector,
    activityItem,
    hrZones,
  },
  mixins: [renderData, changePage, avgHRPaceChart],
  data() {
    return {
      pageTitle: 'MAF',
    };
  },
  mounted() {
    this.createAvgHRPaceChart(this.sortedActivitiesInPeriod);
  },
  watch: {
    sortedActivitiesInPeriod() {
      this.createAvgHRPaceChart(this.sortedActivitiesInPeriod);
    },
  },
  methods: {
    setDateRange(timeMarkers) {
      const options = {
        before: timeMarkers.before,
        after: timeMarkers.after,
        activitiesPerPage: 200,
        pageRequests: 1,
      };

      this.$store.dispatch('fetchActivitiesInPeriod', options);
    },
  },
  computed: {
    activitiesInPeriod() {
      return this.$store.state.activitiesInPeriod;
    },
    sortedActivitiesInPeriod() {
      return this.activitiesInPeriod.slice().sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
  },
};
</script>
