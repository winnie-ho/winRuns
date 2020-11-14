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
  methods: {
  },
  computed: {
  },
};
</script>
