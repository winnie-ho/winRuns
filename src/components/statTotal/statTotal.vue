<template src='./statTotal.html'></template>
<style scoped src='./statTotal.css'></style>

<script src>
import renderData from '../../mixins/renderData';

export default {
  name: 'statTotal',
  mixins: [renderData],
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
  computed: {
    title() {
      return `${this.type}s`.toUpperCase();
    },
  },
};
</script>
