<template src='./maf.html'></template>
<style scoped src='./maf.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import dateRangeSelector from '../../components/dateRangeSelector/dateRangeSelector.vue';
import activityItem from '../../components/activityItem/activityItem.vue';
import hrZones from '../../components/hrZones/hrZones.vue';
import bigStatTotal from '../../components/bigStatTotal/bigStatTotal.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import avgHRPaceChart from '../../mixins/avgHRPaceChart';
import calculateData from '../../mixins/calculateData';

export default {
  name: 'maf',
  components: {
    navBar,
    dateRangeSelector,
    activityItem,
    hrZones,
    bigStatTotal,
  },
  mixins: [renderData, changePage, avgHRPaceChart, calculateData],
  data() {
    return {
      pageTitle: 'MAF',
      fullPageHRPaceChart: false,
    };
  },
  mounted() {
    this.createAvgHRPaceChart(this.sortedActivitiesInPeriod, 'avg-heartrate-pace-chart-in-date-range', this.avgHRData, this.avgPaceData);
  },
  watch: {
    sortedActivitiesInPeriod() {
      this.createAvgHRPaceChart(this.sortedActivitiesInPeriod, 'avg-heartrate-pace-chart-in-date-range', this.avgHRData, this.avgPaceData);
    },
    fixedStartDate() {
      this.createAvgHRPaceChart(this.sortedActivitiesInPeriod, 'avg-heartrate-pace-chart-in-date-range', this.avgHRData, this.avgPaceData);
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
      return this.activitiesInPeriod.slice().filter(activity => activity.type === 'Run' && activity.workout_type === 0).sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
    reverseSortedActivitiesInPeriod() {
      return this.activitiesInPeriod.slice().filter(activity => activity.type === 'Run' && activity.workout_type === 0).sort((b, a) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
    avgHRData() {
      return this.getAvgHRData(this.sortedActivitiesInPeriod);
    },
    avgPaceData() {
      return this.getAvgPaceData(this.sortedActivitiesInPeriod);
    },
    fixedStartDate() {
      return this.$store.state.fixedStartDate;
    },
  },
};
</script>
