<template src='./statTotal.html'></template>
<style scoped src='./statTotal.css'></style>

<script src>
import renderData from '../../mixins/renderData';

export default {
  name: 'statTotal',
  mixins: [renderData],
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    expandToggle: {
      type: Boolean,
      required: false,
    },
    statType: {
      type: Object,
      required: false,
    },
  },
  methods: {},
  computed: {
    title() {
      return `${this.type}s`.toUpperCase();
    },
    statTypeCount() {
      return this.statType.count;
    },
    statTypeDistance() {
      return this.statType.distance;
    },
    statTypeTime() {
      return this.statType.moving_time;
    },
    statTypeElevation() {
      return this.statType.elevation_gain;
    },
  },
};
</script>
