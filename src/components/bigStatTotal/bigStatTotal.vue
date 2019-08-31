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
  methods: {
    getTotalStat(activities, statToTotal) {
      if (!activities) return;
      const totalStat = activities.reduce(
        (total, activity) => total + activity[statToTotal],
        0
      );
      return totalStat;
    }
  },
  computed: {
    totalDistance() {
      if (!this.activitiesInView) return;
      const totalDistance = this.getTotalStat(
        this.activitiesInView,
        "distance"
      );
      return this.renderDistance(totalDistance, true);
    },
    totalTime() {
      if (!this.activitiesInView) return;
      const totalTime = this.getTotalStat(this.activitiesInView, "moving_time");
      return this.renderTime(totalTime);
    },
    totalElevation() {
      const totalElevation = this.getTotalStat(
        this.activitiesInView,
        "total_elevation_gain"
      );
      return this.renderElevation(totalElevation, true);
    }
  }
};
</script>

