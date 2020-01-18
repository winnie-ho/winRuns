<template src='./parkRunMain.html'></template>
<style scoped src='./parkRunMain.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import parkRunDirectory from '../../mixins/parkRunDirectory';
import parkRunCharts from '../../mixins/parkRunCharts';
import yearChanger from '../../components/yearChanger/yearChanger.vue';
import googleMap from '../../components/googleMap/googleMap.vue';

export default {
  name: 'parkRunMain',
  components: {
    navBar,
    yearChanger,
    googleMap,
  },
  data() {
    return {
      pageTitle: 'PARK RUN',
      yearInView: new Date().getFullYear(),
    };
  },
  mixins: [renderData, parkRunCharts],
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
  watch: {
    parkRuns: function () {
      this.createParkRunFinishTimesChart(this.parkRuns);
    },
  },
  methods: {
    setYear(yearInView) {
      this.yearInView = yearInView;
      const beforeMarker = new Date(this.yearInView, 11, 31, 23, 59, 59).getTime() / 1000;
      const afterMarker = new Date(this.yearInView, 0, 1, 0, 0, 0).getTime() / 1000;

      const options = {
        before: beforeMarker,
        after: afterMarker,
        activitiesPerPage: 200,
        pageRequests: 2,
      };
      this.$store.dispatch('fetchActivitiesInPeriod', options);
    },
    getParkRunLocation(parkRun) {
      const matchedParkRun = parkRunDirectory.find(parkRunLocation => parkRunLocation.startCoords[0] == parkRun.start_latitude.toFixed(2) && parkRunLocation.startCoords[1] == parkRun.start_longitude.toFixed(2));

      return matchedParkRun ? matchedParkRun.name : 'Unknown';
    },
  },
  computed: {
    parkRuns() {
      return this.$store.getters.parkRuns;
    },
    fastestParkRunOfYear() {
      const completeParkRuns = this.parkRuns.slice().filter(parkRun => parkRun.distance >= 5000);
      return completeParkRuns.sort((b, a) => b.moving_time - a.moving_time)[0];
    },
    numberOfDifferentParkRuns() {
      const uniqueParkRuns = [...new Set(this.parkRuns.map(parkRun => parkRun.start_latlng[0].toFixed(2) && parkRun.start_latlng[1].toFixed(2)))];
      return uniqueParkRuns;
    },
    averageTime() {
      const totalTimeInSeconds = this.parkRuns.reduce((totalTime, parkRun) => totalTime + parkRun.moving_time, 0);
      return totalTimeInSeconds / this.parkRuns.length;
    },
    averageDistance() {
      const totalDistance = this.parkRuns.reduce((total, parkRun) => total + parkRun.distance, 0);
      return totalDistance / this.parkRuns.length;
    },
    totalParkRunKudosInYear() {
      return this.parkRuns.reduce((totalKudos, parkRun) => totalKudos + parkRun.kudos_count, 0);
    },
    parkRunTimes() {
      return this.parkRuns.map(parkRun => parkRun.moving_time * 1000);
    },
    parkRunDates() {
      return this.parkRuns.map(parkRun => parkRun.start_date);
    },
  },
};
</script>
