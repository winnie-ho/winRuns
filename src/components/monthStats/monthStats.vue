<template src='./monthStats.html'></template>
<style scoped src='./monthStats.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import statTotal from '../statTotal/statTotal.vue';
import triStatsSummary from '../triStatsSummary/triStatsSummary.vue';

export default {
  name: 'monthStatBar',
  mixins: [renderData],
  components: {
    statTotal,
    triStatsSummary,
  },
  props: ['stats', 'activities'],
  methods: {
    statType(activityType) {
      switch (activityType) {
        case 'run':
          return this.stats.run;
        case 'ride':
          return this.stats.ride;
        case 'swim':
          return this.stats.swim;
        default:
          return {};
      }
    },
  },
  computed: {
    screenWidth() {
      return (
        document.getElementById('month-stats__chart-box') && document.getElementById('month-stats__chart-box').clientWidth
      );
    },
  },
};
</script>
