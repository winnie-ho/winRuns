<template src='./yearStats.html'></template>
<style scoped src='./yearStats.css'></style>

<script src>
import statTotal from '../statTotal/statTotal.vue';
import appData from '../../mixins/appData';

export default {
  name: 'yearStats',
  components: {
    statTotal,
  },
  mixins: [appData],
  data() {
    return {
      toggleYearDetailView: false,
    };
  },
  created() {
    this.$store.dispatch('fetchStats');
  },
  computed: {
    stats() {
      return this.$store.state.stats && {
        swim: this.$store.state.stats.ytd_swim_totals,
        ride: this.$store.state.stats.ytd_ride_totals,
        run: this.$store.state.stats.ytd_run_totals,
      };
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
