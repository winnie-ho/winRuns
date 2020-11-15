<template src='./dateRangeSelector.html'></template>
<style scoped src='./dateRangeSelector.css'></style>

<script>
import moment from 'moment';
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'dateRangeSelector',
  mixins: [renderData, appData],
  data() {
    return {
      selectedDateRange: '',
    };
  },
  watch: {
    selectedDateRange() {
      const timeMarkers = {
        before: this.getBeforeMarker(this.selectedDateRange[1]),
        after: this.getAfterMarker(this.selectedDateRange[0]),
      };
      this.$emit('onDateRangeChange', timeMarkers);
    },
  },
  methods: {
    getBeforeMarker(rawDate) {
      return new Date(
        rawDate.getFullYear(),
        rawDate.getMonth(),
        rawDate.getDate(),
        23,
        59,
        59,
      ).getTime() / 1000;
    },
    getAfterMarker(rawDate) {
      return new Date(rawDate).getTime() / 1000;
    },
  },
  computed: {
  },
};
</script>
