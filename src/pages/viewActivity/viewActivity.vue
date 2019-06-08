<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";
import googleMap from "../../components/googleMap.vue";
import lapItem from "../../components/lapItem/lapItem.vue";
import activitySession from "../../components/activitySession/activitySession.vue";

export default {
  name: "viewActivity",
  components: {
    navBar,
    googleMap,
    lapItem,
    activitySession
  },
  mixins: [renderData, changePage],
  data() {
    return {
      openComments: false,
      openPhotos: false,
      lapMarkers: [],
      createSession: false,
      sessionEfforts: [],
      sessionEffortsMergeMarkers: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("fetchKudos", to.params.id);
      vm.$store.dispatch("fetchPhotos", to.params.id);
      vm.$store.dispatch("fetchComments", to.params.id);
      vm.$store.dispatch("fetchActivity", to.params.id).then;
      next();
    });
  },
  beforeDestroy() {
    this.$store.dispatch("resetActivity");
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
        let index = this.sessionEfforts.indexOf(lap);
        if (index > -1) {
          this.sessionEfforts.splice(index, 1);
        }
      } else {
        this.sessionEfforts.push(lap);
      }
    },
    setSessionLapMergeMarker(lap) {
      if (this.sessionEffortsMergeMarkers.includes(lap)) {
        let index = this.sessionEffortsMergeMarkers.indexOf(lap);
        if (index > -1) {
          this.sessionEffortsMergeMarkers.splice(index, 1);
        }
      } else {
        this.sessionEffortsMergeMarkers.push(lap);
      }
    },
    resetSessionEfforts() {
      this.sessionEfforts = [];
    }
  },
  computed: {
    activity() {
      if (!this.$store.state.activity) return;
      return this.$store.state.activity;
    },
    comments() {
      return this.$store.state.comments;
    },
    kudos() {
      return this.$store.state.kudos;
    },
    photos() {
      if (!this.$store.state.activity.photos) return;
      return this.$store.state.photos;
    },
    lapsCount() {
      if (!this.$store.state.activity.laps) return;
      return this.$store.state.activity.laps.length;
    },
    laps() {
      return this.$store.state.activity.laps;
    },
    lat() {
      if (!this.$store.state.activity.start_latlng) return;
      return this.$store.state.activity.start_latlng[0];
    },
    lng() {
      if (!this.$store.state.activity.start_latlng) return;
      return this.$store.state.activity.start_latlng[1];
    },
    polyline() {
      if (!this.$store.state.activity.map) return;
      return this.$store.state.activity.map.polyline;
    },
    sortedLapMarkers() {
      if (!this.lapMarkers) return;
      let result = this.lapMarkers.slice().sort((a, b) => a - b);
      return result;
    },
    lapCalcTimeResult() {
      if (!this.sortedLapMarkers) return;
      let lapTimeCounter = 0;
      for (
        let i = this.sortedLapMarkers[0];
        i < this.sortedLapMarkers[1] + 1;
        i++
      ) {
        lapTimeCounter += this.laps[i].moving_time;
      }
      return lapTimeCounter;
    },
    lapCalcDistanceResult() {
      if (!this.sortedLapMarkers) return;
      let lapDistanceCounter = 0;
      for (
        let i = this.sortedLapMarkers[0];
        i < this.sortedLapMarkers[1] + 1;
        i++
      ) {
        lapDistanceCounter += this.laps[i].distance;
      }
      return lapDistanceCounter;
    },
    lapCountInCalc() {
      if (!this.sortedLapMarkers || this.sortedLapMarkers.length < 2) return;
      return this.sortedLapMarkers[1] - this.sortedLapMarkers[0] + 1;
    },
    displayPhotos() {
      if (!this.photos) return;
      return this.photos.length > 0;
    },
    backgroundImage() {
      if (!this.photos) return "";
      if (this.photos.length > 0) {
        return this.photos[0].urls["1000"];
      } else {
        return "";
      }
    },
    photoCount() {
      if (!this.$store.state.activity.photos) return;
      return this.$store.state.activity.photos.count;
    }
  }
};
</script>
