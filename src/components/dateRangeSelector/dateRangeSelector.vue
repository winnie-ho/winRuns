<template src='./dateRangeSelector.html'></template>
<style scoped src='./dateRangeSelector.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'dateRangeSelector',
  mixins: [renderData, appData],
  data() {
    return {
      selectedDateRange: [new Date(), new Date()],
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  watch: {
    startDate() {
      this.emitUpdatedDates();
    },
    endDate() {
      this.emitUpdatedDates();
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
    emitUpdatedDates() {
      const timeMarkers = {
        before: this.getBeforeMarker(this.endDate),
        after: this.getAfterMarker(this.startDate),
      };
      this.$emit('onDateRangeChange', timeMarkers);
    },
  },
  computed: {
  },
};
</script>
