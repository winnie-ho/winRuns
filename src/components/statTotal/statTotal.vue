<template src="./statTotal.html"></template>
<style scoped src='./statTotal.css'></style>

<script src>
import renderData from '../../mixins/renderData.js'

export default {
  name: "statTotal",
  mixins: [ renderData ],
  data() {
    return {
    };
  },

  props: {
    type: {
      type: String,
      required: true
    },
    expandToggle: {
      type: Boolean,
      required: false
    }
  },

  created() {
  },

  methods: {},

  computed: {
    title: function() {
      return (this.type + 's').toUpperCase();
    },
    statType: function() {
      if (!this.$store.state.stats) return
      switch(this.type) {
        case 'run':
          return this.$store.state.stats.ytd_run_totals
          break;
        case 'ride':
          return this.$store.state.stats.ytd_ride_totals
          break;
        case 'swim':
          return this.$store.state.stats.ytd_swim_totals
          break;
      }
    },
    statTypeCount: function() {
      if (!this.statType) return
      return this.statType.count
    },
    statTypeDistance: function() {
      if (!this.statType) return
      return this.statType.distance
    },
    statTypeTime: function() {
      if (!this.statType) return
      return this.statType.moving_time
    },
    statTypeElevation: function() {
      if (!this.statType) return
      return this.statType.elevation_gain
    }
  }
};
</script>

