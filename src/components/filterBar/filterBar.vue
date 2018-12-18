<template src="./filterBar.html"></template>
<style scoped src='./filterBar.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'filter-bar',
  components: {
  },
  data () {
    return {
      toggleFilterSwim: true,
      toggleFilterRide: true,
      toggleFilterRun: true,
      toggleFilterWorkout: true
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    setSwimFilter: function() {
      this.toggleFilterSwim = !this.toggleFilterSwim;
      this.$emit('filterSwimChange', this.toggleFilterSwim);
    },
    setBikeFilter: function() {
      this.toggleFilterRide = !this.toggleFilterRide;
      this.$emit('filterRideChange', this.toggleFilterRide);
    },
    setRunFilter: function() {
      this.toggleFilterRun = !this.toggleFilterRun;
      this.$emit('filterRunChange', this.toggleFilterRun);
    },
    setWorkoutFilter: function() {
      this.toggleFilterWorkout = !this.toggleFilterWorkout;
      this.$emit('filterWorkoutChange', this.toggleFilterWorkout);
    }
  },
  computed: {
  }
}
</script>
