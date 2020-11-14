<template src='./monthPaceHR.html'></template>
<style scoped src='./monthPaceHR.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import avgHRPaceChart from '../../mixins/avgHRPaceChart';

export default {
  name: 'monthPaceHR',
  mixins: [renderData, appData, avgHRPaceChart],
  components: {
  },
  props: ['activitiesInView'],
  watch: {
    sortedActivitiesInView: function() {
      this.createAvgHRPaceChart(this.sortedActivitiesInView);
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
      return this.activitiesInView.sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
    maxHRData() {
      return this.sortedActivitiesInView.map((activity) => (activity.max_heartrate ? activity.max_heartrate : 0));
    },
    avgHRData() {
      return this.sortedActivitiesInView.map((activity) => (activity.average_heartrate ? activity.average_heartrate : 0));
    },
    avgPace() {
      return this.sortedActivitiesInView.map((activity) => {
        const paceFraction = (1000 / (activity.average_speed * 60)) * 60 * 1000;
        return activity.average_speed ? paceFraction : 0;
      });
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
