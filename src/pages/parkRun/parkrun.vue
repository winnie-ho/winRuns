<template src='./parkRun.html'></template>
<style scoped src='./parkRun.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import parkRunDict from '../../mixins/parkRunDict';
import parkRunSubBar from '../../components/parkRunSubBar/parkRunSubBar.vue';
import renderData from '../../mixins/renderData';

export default {
  name: 'parkRun',
  components: {
    navBar,
    parkRunSubBar,
  },
  data() {
    return {
      pageTitle: 'PARK RUN',
      selectedParkRunName: '',
      defaultParkRun: {
        name: '',
        distance: 0,
        moving_time: 0,
        elapsed_time: 0,
        start_date: '',
        start_latlng: null,
        end_latlng: null,
      },
    };
  },
  mixins: [parkRunDict, renderData],
  mounted() {
    this.$store.dispatch('fetchActivities', 200);
    this.$store.dispatch('fetchFullParkRuns');
    this.createParkRunChart(this.parkRuns);
  },

  created() {
    this.setDefaultParkRunName();
    this.setParkRunLocation();
  },

  methods: {
    setDefaultParkRunName() {
      this.selectedParkRunName = this.parkRunDict.find(
        parkRun => parkRun.default === true,
      ).name;
    },
    setParkRunLocation() {
      const selectedParkRun = this.parkRunDict.find(
        parkRun => parkRun.name === this.selectedParkRunName,
      );
      this.$store.dispatch('setSelectedParkRun', selectedParkRun);
    },
    computeYBContext() {
      if (!this.latestParkRun || !this.fastestParkRun) return;
      if (
        this.latestParkRun.moving_time < this.fastestParkRun && this.latestParkRun.distance >= 5000
      ) {
        return `Fastest time this year! ${this.renderTime(
          this.latestParkRun.moving_time,
        )}`;
      }
      return `Year best ${this.renderTime(this.fastestParkRun.moving_time)}`;
    },
    computeLastPRContext() {
      const latestPRRank = this.timeOrderedParkRuns.indexOf(this.latestParkRun);

      if (latestPRRank === 0 && this.latestParkRun.distance >= 5000) {
        return 'Fastest this year!';
      }

      if (this.latestParkRun.distance < 5000) {
        return `RUN INCOMPLETE! ${this.renderDistance(
          this.latestParkRun.distance,
        )} of 5km in ${this.renderTime(this.latestParkRun.moving_time)}`;
      }

      return `${this.ordinalSuffixOf(latestPRRank)} fastest this year`;
    },
    computePBContext() {
      const pb = 1374;
      if (this.latestParkRun.moving_time < pb && this.latestParkRun.distance >= 5000) {
        return `NEW PB! ${this.renderTime(this.latestParkRun.moving_time)}`;
      }
      return `PB remains at ${this.renderTime(pb)}`;
    },
  },
  computed: {
    parkRuns() {
      return this.$store.getters.parkRuns;
    },
    latestParkRun() {
      if (!this.parkRuns) {
        return this.defaultParkRun;
      }
      return this.parkRuns[0];
    },
    numOfAttempts() {
      if (!this.$store.state.fullParkRuns[0]) return;
      return this.$store.state.fullParkRuns[0].similar_activities.effort_count;
    },
    completeParkRuns() {
      return this.parkRuns && this.parkRuns.filter(parkRun => parkRun.distance > 5000);
    },
    timeOrderedParkRuns() {
      if (!this.parkRuns) return [];
      const timeOrderedParkRuns = this.completeParkRuns
        .slice()
        .sort((a, b) => a.moving_time - b.moving_time);
      this.$store.dispatch('setTimeOrderedParkRuns', timeOrderedParkRuns);
      return timeOrderedParkRuns;
    },
    fastestParkRun() {
      if (!this.completeParkRuns) {
        return this.defaultParkRun;
      }
      return this.completeParkRuns.sort(
        (a, b) => a.moving_time - b.moving_time,
      )[0];
    },
  },
};
</script>
