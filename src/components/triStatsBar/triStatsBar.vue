<template src='./triStatsBar.html'></template>
<style scoped src='./triStatsBar.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import statTotal from '../statTotal/statTotal.vue';

export default {
  name: 'triStatsBar',
  mixins: [renderData],
  components: {
    statTotal,
  },
  props: ['activities'],
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
          elapsed_time: this.getStatValue('Swim', 'elapsed_time'),
          elevation_gain: this.getStatValue('Swim', 'total_elevation_gain'),
          moving_time: this.getStatValue('Swim', 'moving_time'),
        },
        ride: {
          count: this.getStatCount('Ride'),
          distance: this.getStatValue('Ride', 'distance'),
          elapsed_time: this.getStatValue('Ride', 'elapsed_time'),
          elevation_gain: this.getStatValue('Ride', 'total_elevation_gain'),
          moving_time: this.getStatValue('Ride', 'moving_time'),
        },
        run: {
          count: this.getStatCount('Run'),
          distance: this.getStatValue('Run', 'distance'),
          elapsed_time: this.getStatValue('Run', 'elapsed_time'),
          elevation_gain: this.getStatValue('Run', 'total_elevation_gain'),
          moving_time: this.getStatValue('Run', 'moving_time'),
        },
      };
    },
  },
};
</script>
