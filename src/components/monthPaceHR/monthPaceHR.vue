<template src='./monthPaceHR.html'></template>
<style scoped src='./monthPaceHR.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import avgHRPaceChart from '../../mixins/avgHRPaceChart';
import calculateData from '../../mixins/calculateData';

export default {
  name: 'monthPaceHR',
  mixins: [renderData, appData, avgHRPaceChart, calculateData],
  components: {
  },
  props: ['activitiesInView'],
  watch: {
    sortedActivitiesInView() {
      this.createAvgHRPaceChart(this.sortedActivitiesInView, 'avg-heartrate-pace-chart');
    },
  },
  data() {
    return {
      displayMaxAvgHRChart: false,
      fullPageHRChart: false,
    };
  },
  methods: {
  },
  computed: {
    sortedActivitiesInView() {
      return this.activitiesInView.slice().sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
    maxHRData() {
      return this.sortedActivitiesInView.map((activity) => (activity.max_heartrate ? activity.max_heartrate : 0));
    },
    avgHRData() {
      return this.getAvgHRData(this.sortedActivitiesInView);
    },
    avgPace() {
      return this.getAvgPaceData(this.sortedActivitiesInView);
    },
    highestMaxHR() {
      return Math.max(...this.maxHRData);
    },
    lowestMaxHR() {
      return Math.min(...this.maxHRData) === 0 ? Math.min(...this.maxHRData.filter(maxHR => maxHR > 0)) : Math.min(...this.maxHRData);
    },
    highestAvgHR() {
      return Math.max(...this.avgHRData);
    },
    lowestAvgHR() {
      return Math.min(...this.avgHRData) === 0 ? Math.min(...this.avgHRData.filter(avgHR => avgHR > 0)) : Math.min(...this.avgHRData);
    },
  },
};
</script>
