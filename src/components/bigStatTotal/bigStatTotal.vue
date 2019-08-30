<template src="./bigStatTotal.html"></template>
<style scoped src='./bigStatTotal.css'></style>

<script src>
import renderData from "../../mixins/renderData.js";

export default {
  name: "bigStatTotal",
  mixins: [renderData],
  props: ["activitiesInView", "type"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    totalDistance() {
      if (!this.activitiesInView) return;
      const totalDistance = this.activitiesInView.reduce(
        (total, activity) => total + activity.distance,
        0
      );
      return this.renderDistance(totalDistance, true);
    },
    totalTime() {
      if (!this.activitiesInView) return;
      const totalTime = this.activitiesInView.reduce(
        (total, activity) => total + activity.moving_time,
        0
      );
      return this.renderTime(totalTime);
    },
    totalElevation() {
      if (!this.activitiesInView) return;
      const totalElevation = this.activitiesInView.reduce(
        (total, activity) => total + activity.total_elevation_gain,
        0
      );
      return this.renderElevation(totalElevation, true);
    }
  }
};
</script>

