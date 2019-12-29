<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import googleMap from '../../components/googleMap/googleMap.vue';
import lapItem from '../../components/lapItem/lapItem.vue';
import activitySession from '../../components/activitySession/activitySession.vue';

export default {
  name: 'viewActivity',
  components: {
    navBar,
    googleMap,
    lapItem,
    activitySession,
  },
  mixins: [renderData, changePage],
  data() {
    return {
      openComments: false,
      openPhotos: false,
      lapMarkers: [],
      createSession: false,
      sessionEfforts: [],
      sessionEffortsMergeMarkers: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchKudos', to.params.id);
      vm.$store.dispatch('fetchPhotos', to.params.id);
      vm.$store.dispatch('fetchComments', to.params.id);
      vm.$store.dispatch('fetchActivity', to.params.id);
      next();
    });
  },
  beforeDestroy() {
    this.$store.dispatch('resetActivity');
  },
  methods: {
    setLapMarker(lap) {
      this.lapMarkers.push(lap.lap_index - 1);
      if (this.lapMarkers.length > 2) {
        this.lapMarkers.shift();
      }
    },
    clearLapMarkers() {
      this.lapMarkers = [];
    },
    toggleCreateSession() {
      this.createSession = !this.createSession;
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
  },
  computed: {
    activity() {
      return this.$store.state.activity;
    },
    comments() {
      return this.$store.state.comments;
    },
    kudos() {
      return this.$store.state.kudos;
    },
    photos() {
      return this.$store.state.photos;
    },
    lapsCount() {
      return (
        this.$store.state.activity.laps && this.$store.state.activity.laps.length
      );
    },
    laps() {
      return this.$store.state.activity.laps;
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
    lapCountInCalc() {
      if (!this.sortedLapMarkers || this.sortedLapMarkers.length < 2) return;
      return this.sortedLapMarkers[1] - this.sortedLapMarkers[0] + 1;
    },
    displayPhotos() {
      return this.photos && this.photos.length > 0;
    },
    backgroundImage() {
      return this.photos && this.photos.length > 0 ? this.photos[0].urls['1000'] : '';
    },
    photoCount() {
      return this.$store.state.activity.photos.count;
    },
    hasMapPolyline() {
      return this.$store.state.activity.map && this.$store.state.activity.map.summary_polyline;
    },
  },
};
</script>
