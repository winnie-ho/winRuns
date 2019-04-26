<template src="./weekStats.html"></template>
<style scoped src='./weekStats.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "weekStats",
  props: ["weekInView"],
  data() {
    return {};
  },
  mixins: [renderData],
  methods: {
    countActivityType(type) {
      if (!this.weekInView) return;
      return this.weekInView.filter(activity => activity.type === type).length;
    }
  },
  computed: {
    weekDistance() {
      if (!this.weekInView) return;
      let weekDistance = this.weekInView.reduce(
        (acc, activity) => acc + activity.distance,
        0
      );
      return (weekDistance / 1000).toFixed(0) + "km";
    },
    weekTime() {
      if (!this.weekInView) return;
      return this.weekInView.reduce(
        (acc, activity) => acc + activity.moving_time,
        0
      );
    },
    weekActivitiesCount() {
      if (!this.weekInView) return;
      return this.weekInView.length;
    }
  }
};
</script>
