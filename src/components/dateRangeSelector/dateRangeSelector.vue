<template src='./dateRangeSelector.html'></template>
<style scoped src='./dateRangeSelector.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import startDateForm from '../startDateForm/startDateForm.vue';

export default {
  name: 'dateRangeSelector',
  mixins: [renderData, appData],
  props: ['storedFixedStartDate'],
  components: {
    startDateForm,
  },
  data() {
    return {
      startDate: this.storedFixedStartDate,
      endDate: new Date(),
      showFixedStartDateFrom: false,
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
  mounted() {
    this.emitUpdatedDates();
  },
  methods: {
    editFixedStartDate() {
      this.showFixedStartDateFrom = !this.showFixedStartDateFrom;
    },
    closeFixedStartDateForm() {
      this.showFixedStartDateFrom = false;
    },
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
    updateFixedStartDate(updatedFixedStartDate) {
      this.startDate = updatedFixedStartDate;
      this.$emit('onFixedStartDateUpdate', updatedFixedStartDate);
    },
  },
  computed: {
  },
};
</script>
