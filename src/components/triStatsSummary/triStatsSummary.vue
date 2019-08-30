<template src="./triStatsSummary.html"></template>
<style scoped src='./triStatsSummary.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "triStatsSummary",
  props: ["activitiesInView"],
  data() {
    return {};
  },
  mixins: [renderData],
  methods: {
    countActivityType(type) {
      if (!this.activitiesInView) return;
      return this.activitiesInView.filter(activity => activity.type === type)
        .length;
    }
  },
  computed: {
    totalDistance() {
      if (!this.activitiesInView) return;
      const totalDistance = this.activitiesInView.reduce(
        (acc, activity) => acc + activity.distance,
        0
      );
      return this.renderDistance(totalDistance, true);
    },
    totalTime() {
      if (!this.activitiesInView) return;
      const totalTime = this.activitiesInView.reduce(
        (acc, activity) => acc + activity.moving_time,
        0
      );
      return this.renderTime(totalTime, true);
    },
    totalActivitiesCount() {
      if (!this.activitiesInView) return;
      return this.activitiesInView.length;
    }
  }
};
</script>
