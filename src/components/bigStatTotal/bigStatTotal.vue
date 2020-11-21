<template src='./bigStatTotal.html'></template>
<style scoped src='./bigStatTotal.css'></style>

<script src>
import renderData from '../../mixins/renderData';

export default {
  name: 'bigStatTotal',
  mixins: [renderData],
  props: ['activitiesInView', 'type'],
  methods: {
    getTotalStat(activities, statToTotal) {
      return activities.reduce((total, activity) => total + activity[statToTotal], 0);
    },
    totalNumberOfActivity(type) {
      return this.activitiesInView.filter(activity => activity.type === type).length;
    },
  },
  computed: {
    totalDistance() {
      const totalDistance = this.getTotalStat(this.activitiesInView, 'distance');
      return this.activitiesInView && this.renderDistance(totalDistance, true);
    },
    totalTime() {
      const totalTime = this.getTotalStat(this.activitiesInView, 'moving_time');
      return this.activitiesInView && this.renderTime(totalTime);
    },
    totalElevation() {
      const totalElevation = this.getTotalStat(
        this.activitiesInView,
        'total_elevation_gain',
      );
      return this.renderElevation(totalElevation, true);
    },
  },
};
</script>
