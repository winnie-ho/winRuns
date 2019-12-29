<template src='./activityItem.html'></template>
<style scoped src='./activityItem.css'></style>

<script>
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';

export default {
  name: 'activityItem',
  components: {},
  mixins: [renderData, changePage],
  props: ['activity'],
};
</script>
