<template src='./triStatsBar.html'></template>
<style scoped src='./triStatsBar.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import calculateData from '../../mixins/calculateData';
import statTotal from '../statTotal/statTotal.vue';

export default {
  name: 'triStatsBar',
  mixins: [renderData, calculateData],
  components: {
    statTotal,
  },
  props: ['activities', 'maxDistance'],
  methods: {
    getStatCount(activityType) {
      return this.activities.filter(
        activity => activity.type === activityType,
      ).length;
    },
    getStatValue(activityType, statMetric) {
      return this.activities
        .filter(activity => activity.type === activityType)
        .reduce((total, i) => total + i[statMetric], 0);
    },
  },
  computed: {
    screenWidth() {
      return (
        document.getElementById('month-stats__chart-box') && document.getElementById('month-stats__chart-box').clientWidth
      );
    },
    stats() {
      return this.activities && {
        swim: {
          count: this.getStatCount('Swim'),
          distance: this.getStatValue('Swim', 'distance'),
        },
        ride: {
          count: this.getStatCount('Ride'),
          distance: this.getStatValue('Ride', 'distance'),
        },
        run: {
          count: this.getStatCount('Run'),
          distance: this.getStatValue('Run', 'distance'),
        },
      };
    },
  },
};
</script>
