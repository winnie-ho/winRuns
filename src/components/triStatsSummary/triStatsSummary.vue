<template src='./triStatsSummary.html'></template>
<style scoped src='./triStatsSummary.css'></style>

<script>
import renderData from '../../mixins/renderData';

export default {
  name: 'triStatsSummary',
  props: ['activitiesInView', 'showDisciplineCount'],
  data() {
    return {};
  },
  mixins: [renderData],
  methods: {
    countActivityType(type) {
      return this.activitiesInView.filter(activity => activity.type === type).length;
    },
  },
  computed: {
    totalDistance() {
      const totalDistance = this.activitiesInView.reduce((total, activity) => total + activity.distance, 0);
      return this.renderDistance(totalDistance, true);
    },
    totalTime() {
      const totalTime = this.activitiesInView.reduce((total, activity) => total + activity.moving_time, 0);
      return this.renderTime(totalTime);
    },
    totalActivitiesCount() {
      return this.activitiesInView.length;
    },
  },
};
</script>
