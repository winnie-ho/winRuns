<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import googleMap from '../../components/googleMap.vue'

export default {
  name: 'viewActivity',
  components: {
    'nav-bar': navBar,
    'google-map': googleMap
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITY',
      openLaps: false,
      openComments: false,
      openKudos: false,
      openPhotos: false,
      lapMarkers: []
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    markLap(index){
      this.lapMarkers.push(index-1);
      if (this.lapMarkers.length > 2) {
        this.lapMarkers.shift();
      }
    },
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
      return this.lapMarkers.sort((a, b) => a - b);
    },
    lapCalcResult: function () {
      if (!this.sortedLapMarkers) return;
      let lapTimeCounter = 0;
      for (let i = this.sortedLapMarkers[0]; i < this.sortedLapMarkers[1] + 1; i ++) {
        lapTimeCounter += this.laps[i].moving_time;
      }
      return lapTimeCounter;
    }
  }
}
</script>
