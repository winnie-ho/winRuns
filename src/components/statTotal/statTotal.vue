<template src='./statTotal.html'></template>
<style scoped src='./statTotal.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import calculateData from '../../mixins/calculateData';

export default {
  name: 'statTotal',
  mixins: [renderData, calculateData],
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
    toggleYearDetailView: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      animationHeightStyleInstruction: '--animationHeightStyle: 220px;',
    };
  },
};
</script>
