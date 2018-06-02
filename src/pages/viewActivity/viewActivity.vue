<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import googleMap from '../../components/googleMap.vue'
import lap from '../../components/lap/lap.vue'
import activitySession from '../../components/activitySession/activitySession.vue'

export default {
  name: 'viewActivity',
  components: {
    'nav-bar': navBar,
    'google-map': googleMap,
    'lap': lap,
    'activitySession': activitySession
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITY',
      openLaps: false,
      openComments: false,
      openKudos: false,
      openPhotos: false,
      lapMarkers: [],
      createSession: false,
      sessionEfforts: []
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    setLapMarker: function(lap) {
      this.lapMarkers.push(lap.lap_index - 1);
      if (this.lapMarkers.length > 2) {
        this.lapMarkers.shift();
      }
    },
    clearLapMarkers: function() {
      this.lapMarkers = [];
    },
    toggleCreateSession: function() {
      this.createSession = !this.createSession;
    },
    setSessionLapMarker(lap) {
      if (this.sessionEfforts.includes(lap)) {
        let index = this.sessionEfforts.indexOf(lap);
        if (index > -1) {
          this.sessionEfforts.splice(index, 1);
        }
      } else {
        this.sessionEfforts.push(lap)
      }
    },
    resetSessionEfforts: function() {
      this.sessionEfforts = [];
    }
  },
  computed: {
    activity: function() {
      return this.$store.state.activity
    },
    comments: function() {
      return this.$store.state.comments
    },
    kudos: function() {
      return this.$store.state.kudos
    },
    photos: function() {
      return this.$store.state.photos
    },
    lapsCount: function() {
      if (!this.$store.state.activity.laps) return
      return this.$store.state.activity.laps.length
    },
    laps: function() {
      return this.$store.state.activity.laps
    },
    lat: function () {
      if (!this.$store.state.activity.start_latlng) return
      return this.$store.state.activity.start_latlng[0]
    },
    lng: function () {
      if (!this.$store.state.activity.start_latlng) return
      return this.$store.state.activity.start_latlng[1]
    },
    polyline: function () {
      if (!this.$store.state.activity.map) return
      return this.$store.state.activity.map.polyline
    },
    sortedLapMarkers(){
      if (!this.lapMarkers) return;
      let result = this.lapMarkers.slice().sort((a, b) => a - b);
      return result;
    },
    lapCalcTimeResult: function () {
      if (!this.sortedLapMarkers) return;
      let lapTimeCounter = 0;
      for (let i = this.sortedLapMarkers[0]; i < this.sortedLapMarkers[1] + 1; i ++) {
        lapTimeCounter += this.laps[i].moving_time;
      }
      return lapTimeCounter;
    },
    lapCalcDistanceResult: function () {
      if (!this.sortedLapMarkers) return;
      let lapDistanceCounter = 0;
      for (let i = this.sortedLapMarkers[0]; i < this.sortedLapMarkers[1] + 1; i ++) {
        lapDistanceCounter += this.laps[i].distance;
      }
      return lapDistanceCounter;
    },
    lapCountInCalc: function (){
      if (!this.sortedLapMarkers || this.sortedLapMarkers.length < 2) return;
      return (this.sortedLapMarkers[1] - this.sortedLapMarkers[0] + 1);
    }
  }
}
</script>
