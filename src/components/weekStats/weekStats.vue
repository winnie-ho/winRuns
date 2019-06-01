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
      return this.weekInView.filter(activity => activity.type === type).length;
    }
  },
  computed: {
    weekDistance() {
      let weekDistance = this.weekInView.reduce(
        (acc, activity) => acc + activity.distance,
        0
      );
      return `${(weekDistance / 1000).toFixed(0)}km`;
    },
    weekTime() {
      return this.weekInView.reduce(
        (acc, activity) => acc + activity.moving_time,
        0
      );
    },
    weekActivitiesCount() {
      return this.weekInView.length;
    }
  }
};
</script>
