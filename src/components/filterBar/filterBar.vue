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
      toggleFilterSwim: false,
      toggleFilterRide: false,
      toggleFilterRun: false,
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
    }
  },
  computed: {
  }
}
</script>
