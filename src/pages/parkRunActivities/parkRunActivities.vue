<template src='./parkRunActivities.html'></template>
<style scoped src='./parkRunActivities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import parkRunSubBar from '../../components/parkRunSubBar/parkRunSubBar.vue';
import activityItem from '../../components/activityItem/activityItem.vue';
import renderData from '../../mixins/renderData';

export default {
  name: 'parkRunActivities',
  components: {
    navBar,
    activityItem,
    parkRunSubBar,
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: 'PARK RUNS',
    };
  },
  mounted() {},
  created() {},
  methods: {},
  computed: {
    parkRuns() {
      return this.$store.getters.parkRuns;
    },
  },
};
</script>
