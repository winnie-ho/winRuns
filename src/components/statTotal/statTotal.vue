<template src="./statTotal.html"></template>
<style scoped src='./statTotal.css'></style>

<script src>
import renderData from "../../mixins/renderData.js";

export default {
  name: "statTotal",
  mixins: [renderData],
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true
    },
    expandToggle: {
      type: Boolean,
      required: false
    },
    statType: {
      type: Object,
      required: false
    }
  },
  methods: {},
  computed: {
    title() {
      return (this.type + "s").toUpperCase();
    },
    statTypeCount() {
      if (!this.statType) return;
      return this.statType.count;
    },
    statTypeDistance() {
      if (!this.statType) return;
      return this.statType.distance;
    },
    statTypeTime() {
      if (!this.statType) return;
      return this.statType.moving_time;
    },
    statTypeElevation() {
      if (!this.statType) return;
      return this.statType.elevation_gain;
    }
  }
};
</script>

