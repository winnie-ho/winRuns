<template src='./filterBar.html'></template>
<style scoped src='./filterBar.css'></style>

<script>
export default {
  name: 'filter-bar',
  components: {},
  data() {
    return {
      toggleFilterSwim: true,
      toggleFilterRide: true,
      toggleFilterRun: true,
      toggleFilterWorkout: true,
    };
  },
  methods: {
    setFilter(activityType) {
      switch (activityType) {
        case 'SWIM':
          this.toggleFilterSwim = !this.toggleFilterSwim;
          this.$emit('filterSwimChange', this.toggleFilterSwim);
          break;
        case 'RIDE':
          this.toggleFilterRide = !this.toggleFilterRide;
          this.$emit('filterRideChange', this.toggleFilterRide);
          break;
        case 'RUN':
          this.toggleFilterRun = !this.toggleFilterRun;
          this.$emit('filterRunChange', this.toggleFilterRun);
          break;
        case 'WORKOUT':
          this.toggleFilterWorkout = !this.toggleFilterWorkout;
          this.$emit('filterWorkoutChange', this.toggleFilterWorkout);
          break;
      }
    },
  },
};
</script>
