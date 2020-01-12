<template src='./parkRunMain.html'></template>
<style scoped src='./parkRunMain.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import yearChanger from '../../components/yearChanger/yearChanger.vue';

export default {
  name: 'parkRunMain',
  components: {
    navBar,
    yearChanger,
  },
  data() {
    return {
      pageTitle: 'PARK RUN',
      yearInView: new Date().getFullYear(),
    };
  },
  mixins: [renderData],
  created() {
    const beforeMarker = new Date(
      this.yearInView,
      11,
      31,
      23,
      59,
      59,
    ).getTime() / 1000;

    const afterMarker = new Date(
      this.yearInView,
      0,
      1,
      0,
      0,
      0,
    ).getTime() / 1000;

    const options = {
      before: beforeMarker,
      after: afterMarker,
      activitiesPerPage: 200,
      pageRequests: 2,
    };
    this.$store.dispatch('fetchActivitiesInPeriod', options);
  },


  methods: {
    setYear(yearInView) {
      this.yearInView = yearInView;
    },
  },
  computed: {
    parkRuns() {
      return this.$store.getters.parkRuns;
    },
  },
};
</script>
