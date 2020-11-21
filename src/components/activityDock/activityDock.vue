<template src='./activityDock.html'></template>
<style scoped src='./activityDock.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import lapItem from '../lapItem/lapItem.vue';
import activitySession from '../activitySession/activitySession.vue';
import avgHRPaceByRunChart from '../../mixins/avgHRPaceByRunChart';
import calculateData from '../../mixins/calculateData';


export default {
  name: 'activityDock',
  components: {
    lapItem,
    activitySession,
  },
  mixins: [renderData, appData, avgHRPaceByRunChart, calculateData],
  props: ['activity'],
  data() {
    return {
      toggleLaps: false,
      toggleKudos: false,
      toggleComments: false,
      lapMarkers: [],
      sessionEfforts: [],
      createSession: false,
      sessionEffortsMergeMarkers: [],
      fullPageHRPaceChart: false,
    };
  },
  mounted() {
    this.createAvgHRPaceByRunChart('avg-heartrate-pace-chart', this.avgHRDataByRun, this.avgPaceDataByRun);
  },
  watch: {
    activity() {
      this.createAvgHRPaceByRunChart('avg-heartrate-pace-chart', this.avgHRDataByRun, this.avgPaceDataByRun);
    },
  },
  methods: {
    setDockItem(item) {
      switch (item) {
        case 'laps':
          this.toggleLaps = !this.toggleLaps;
          this.toggleKudos = false;
          this.toggleComments = false;
          break;
        case 'kudos':
          this.toggleLaps = false;
          this.toggleKudos = !this.toggleKudos;
          this.toggleComments = false;
          break;
        case 'comments':
          this.toggleLaps = false;
          this.toggleKudos = false;
          this.toggleComments = !this.toggleComments;
          break;
        default:
          this.toggleLaps = false;
          this.toggleKudos = false;
          this.toggleComments = false;
      }
    },
    setLapMarker(lap) {
      this.lapMarkers.push(lap.lap_index - 1);
      if (this.lapMarkers.length > 2) {
        this.lapMarkers.shift();
      }
    },
    setSessionLapMarker(lap) {
      if (this.sessionEfforts.includes(lap)) {
        const index = this.sessionEfforts.indexOf(lap);
        if (index > -1) {
          this.sessionEfforts.splice(index, 1);
        }
      } else {
        this.sessionEfforts.push(lap);
      }
    },
    setSessionLapMergeMarker(lap) {
      if (this.sessionEffortsMergeMarkers.includes(lap)) {
        const index = this.sessionEffortsMergeMarkers.indexOf(lap);
        if (index > -1) {
          this.sessionEffortsMergeMarkers.splice(index, 1);
        }
      } else {
        this.sessionEffortsMergeMarkers.push(lap);
      }
    },
    resetSessionEfforts() {
      this.sessionEfforts = [];
    },
    clearLapMarkers() {
      this.lapMarkers = [];
    },
    toggleCreateSession() {
      this.createSession = !this.createSession;
    },
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    kudos() {
      return this.$store.state.kudos;
    },
    laps() {
      return this.$store.state.activity.laps;
    },
    photos() {
      return this.$store.state.photos;
    },
    hasPhotos() {
      return this.photos.length > 0;
    },
    lapsCount() {
      return (
        this.$store.state.activity.laps && this.$store.state.activity.laps.length
      );
    },
    lapCountInCalc() {
      if (!this.sortedLapMarkers || this.sortedLapMarkers.length < 2) return;
      return this.sortedLapMarkers[1] - this.sortedLapMarkers[0] + 1;
    },
    sortedLapMarkers() {
      return this.lapMarkers && this.lapMarkers.slice().sort((a, b) => a - b);
    },
    lapCalcTimeResult() {
      let lapTimeCounter = 0;
      for (
        let i = this.sortedLapMarkers[0];
        i < this.sortedLapMarkers[1] + 1;
        i++
      ) {
        lapTimeCounter += this.laps[i].moving_time;
      }
      return this.sortedLapMarkers && lapTimeCounter;
    },
    lapCalcDistanceResult() {
      let lapDistanceCounter = 0;
      for (
        let i = this.sortedLapMarkers[0];
        i < this.sortedLapMarkers[1] + 1;
        i++
      ) {
        lapDistanceCounter += this.laps[i].distance;
      }
      return this.sortedLapMarkers && lapDistanceCounter;
    },
    avgHRDataByRun() {
      return this.activity.laps ? this.getAvgHRData(this.activity.laps) : null;
    },
    avgPaceDataByRun() {
      return this.activity.laps ? this.getAvgPaceData(this.activity.laps) : null;
    },
  },
};
</script>
