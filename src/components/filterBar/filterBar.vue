<template src="./filterBar.html"></template>
<style scoped src='./filterBar.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "filter-bar",
  components: {},
  data() {
    return {
      toggleFilterSwim: true,
      toggleFilterRide: true,
      toggleFilterRun: true,
      toggleFilterWorkout: true
    };
  },
  methods: {
    setSwimFilter() {
      this.toggleFilterSwim = !this.toggleFilterSwim;
      this.$emit("filterSwimChange", this.toggleFilterSwim);
    },
    setBikeFilter() {
      this.toggleFilterRide = !this.toggleFilterRide;
      this.$emit("filterRideChange", this.toggleFilterRide);
    },
    setRunFilter() {
      this.toggleFilterRun = !this.toggleFilterRun;
      this.$emit("filterRunChange", this.toggleFilterRun);
    },
    setWorkoutFilter() {
      this.toggleFilterWorkout = !this.toggleFilterWorkout;
      this.$emit("filterWorkoutChange", this.toggleFilterWorkout);
    }
  },
};
</script>
