<template src='./statBar.html'></template>
<style scoped src='./statbar.css'></style>

<script src>
import statTotal from '../statTotal/statTotal.vue';

export default {
  name: 'statBar',
  components: {
    statTotal,
  },
  props: ['stats', 'title'],
  created() {
    this.$store.dispatch('fetchStats');
  },
  methods: {
    statType(activityType) {
      return this.stats[activityType];
    },
  },
};
</script>
