<template src="./parkRun.html"></template>
<style scoped src='./parkRun.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import parkRunDict from '../../mixins/parkRunDict.js'
import renderData from '../../mixins/renderData.js'

export default {
  name: 'parkRun',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
      pageTitle: 'PARK RUNS',
      selectedParkRunName: '',
      defaultParkRun: {
        "name": "",
        "distance": 0,
        "moving_time": 0,
        "elapsed_time": 0,         
        "start_date": "",
        "start_latlng": null,
        "end_latlng": null,
      },
    }
  },
  mixins: [ parkRunDict, renderData ],
  mounted () {
    this.createParkRunChart(this.parkRuns)
  },

  created () {
    this.setDefaultParkRunName()
    this.setParkRunLocation()
  },

  methods: {
    setDefaultParkRunName: function () {
      this.selectedParkRunName = this.parkRunDict.find(parkRun => parkRun.default === true).name
    },
    setParkRunLocation: function() {
      const selectedParkRun = this.parkRunDict.find(parkRun => parkRun.name === this.selectedParkRunName)
      this.$store.dispatch('setSelectedParkRun', selectedParkRun)
    },
    computeYBContext: function () {
      if (!this.latestParkRun || !this.fastestParkRun) return
      if (this.latestParkRun.moving_time < this.fastestParkRun && this.latestParkRun.distance >= 5000) {
        return "Fastest time this year! " + this.renderTime(this.latestParkRun.moving_time);
      }
      return "Year best " + this.renderTime(this.fastestParkRun.moving_time);
    },
    computeLastPRContext: function () {
      const latestPRRank = this.timeOrderedParkRuns.indexOf(this.latestParkRun);

      if (latestPRRank === 0 && this.latestParkRun.distance >= 5000) {
        return "Fastest this year!"
      }

      if (this.latestParkRun.distance < 5000) {
        return "RUN INCOMPLETE! " + this.renderDistance(this.latestParkRun.distance) + " of 5km in " + this.renderTime(this.latestParkRun.moving_time);
      }
      
      return this.ordinalSuffixOf(latestPRRank) + " fastest this year";
    },
    computePBContext: function () {
      let pb = 1374
      if (this.latestParkRun.moving_time < pb && this.latestParkRun.distance >= 5000) {
        return "NEW PB! " + this.renderTime(this.latestParkRun.moving_time);
      }
      return "PB remains at " + this.renderTime(pb);
    }
  },
  computed: {
    parkRuns: function () {
      return this.$store.getters.parkRuns
    },
    latestParkRun: function (){
      if (!this.parkRuns) {
        return this.defaultParkRun
      }
      return this.parkRuns[0]
    },
    completeParkRuns: function () {
      if (!this.parkRuns) return
      return this.parkRuns.filter(parkRun => parkRun.distance > 5000)
    },
    timeOrderedParkRuns: function () {
      if (!this.parkRuns) return []
      return this.parkRuns.slice().sort((a, b) => a.moving_time - b.moving_time)
    },
    fastestParkRun: function () {
      if (!this.completeParkRuns) {
        return this.defaultParkRun
      }
      return this.completeParkRuns.sort((a, b) => a.moving_time - b.moving_time)[0]
    }
  }
}
</script>