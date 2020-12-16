<template src='./activityDock.html'></template>
<style scoped src='./activityDock.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import lapItem from '../lapItem/lapItem.vue';
import activitySession from '../activitySession/activitySession.vue';
import avgHRPaceByRunChart from '../../mixins/avgHRPaceByRunChart';
import streamChart from '../../mixins/streamChart';
import calculateData from '../../mixins/calculateData';


export default {
  name: 'activityDock',
  components: {
    lapItem,
    activitySession,
  },
  mixins: [renderData, appData, avgHRPaceByRunChart, streamChart, calculateData],
  props: ['activity', 'percentTimeInZ2', 'timeInZ2'],
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
      fullStreamChart: false,
    };
  },
  mounted() {
    this.createAvgHRPaceByRunChart('avg-heartrate-pace-chart', this.avgMAFLimitDataByRun, this.avgHRDataByRun, this.avgPaceDataByRun);
    this.createStreamChart('stream-chart', this.streamMAFLimitData, this.streamTimeData, this.streamHRData, this.streamPaceData);
  },
  watch: {
    activity() {
      this.createAvgHRPaceByRunChart('avg-heartrate-pace-chart', this.avgMAFLimitDataByRun, this.avgHRDataByRun, this.avgPaceDataByRun);
    },
    activityStream() {
      this.createStreamChart('stream-chart', this.streamMAFLimitData, this.streamTimeData, this.streamHRData, this.streamPaceData);
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
    getMAFLimitData(dataPoints) {
      if (!dataPoints) {
        return [];
      }
      const dataPointCount = dataPoints.length;
      const MAFLimitData = [];
      for (let i = 0; i < dataPointCount; i++) {
        MAFLimitData.push(this.HRZones.z2);
      }
      return MAFLimitData;
    },
  },
  computed: {
    HRZones() {
      return this.$store.state.HRZones;
    },
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
      if (!this.sortedLapMarkers || this.sortedLapMarkers.length < 2) return 0;
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
      return this.activity.laps ? this.getActivitiesAvgHRData(this.activity.laps) : null;
    },
    avgPaceDataByRun() {
      return this.activity.laps ? this.getActivitiesAvgPaceData(this.activity.laps) : null;
    },
    avgMAFLimitDataByRun() {
      return this.activity.laps ? this.getMAFLimitData(this.activity.laps) : null;
    },
    activityStream() {
      return this.$store.state.activityStream;
    },
    streamMAFLimitData() {
      return this.activityStream.time ? this.getMAFLimitData(this.activityStream.time.data) : [];
    },
    streamTimeData() {
      return this.activityStream.time ? this.activityStream.time.data.map(time => time * 1000) : [];
    },
    streamHRData() {
      return this.activityStream.heartrate ? this.activityStream.heartrate.data : [];
    },
    streamPaceData() {
      return this.activityStream.velocity_smooth ? this.getPaceData(this.activityStream.velocity_smooth.data) : [];
    },
  },
};
</script>
