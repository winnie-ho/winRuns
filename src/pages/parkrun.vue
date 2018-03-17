<template>
  <div id='parkrun'>
    <nav-bar></nav-bar>
    <div id="park-run-latest" class="row">
      <div id='last-pr'>
        <img id="park-run-logo" class='dark-icon' src="../assets/icon_park_run_logo.png"/>
        <select 
          id="park-run-select" 
          v-model='selectedParkRunName'
          v-on:change='setParkRunLocation()'>
          <option v-for='parkRun in parkRunDict' v-bind:key='parkRun.index' v-bind:value='parkRun.name'>{{ parkRun.name }}</option>
        </select>

        <div id="last-pr__date">LAST RAN: {{ renderDate(latestParkRun.start_date) }}</div>
        <div id="last-pr__name" class="last-pr__metric">{{ latestParkRun.name }}</div>
        <div class="last-pr__metric row sb">
          <div id="last-pr__time">{{ renderTime(latestParkRun.time) }}</div>
          <div id="last-pr__pace">{{ renderPace(latestParkRun.time, latestParkRun.distance) }}</div>
        </div>
        <div class="last-pr__summary">
          <div id="last-pr__context">{{ computeLastPRContext() }}</div>
          <div id="year-best">{{ computeYBContext() }}</div>
          <div id="pb">{{ computePBContext() }}</div>
        </div>
      </div>
    </div>
      <div id='pr-list' v-for='parkRun in timeOrderedParkRuns' v-bind:key='parkRun.index'>
        <div class='row sb'>
          {{ renderDate(parkRun.start_date) }}
          {{ parkRun.name }}
        </div>

        <div class='row sb'>
          {{ renderTime(parkRun.moving_time) }}
          {{ renderPace(parkRun.moving_time, parkRun.distance) }}
        </div>
      </div>
      
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import parkRunDict from '../mixins/parkRunDict.js'
import renderData from '../mixins/renderData.js'

export default {
  name: 'parkrun',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
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

<style scoped>
  #parkrun {
    display: flex;
    flex-direction: column;
    background-color: rgb(232, 235, 240); 
    font-size: 16px;
    height: 85%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #park-run-logo{
    height: 65px;
    width: auto;
  }

  #park-run-latest{
    align-items: flex-start;
    width: 100%;
  }
  
  #park-run-select {
    position: absolute;
    margin: 10px 0;
    height: 30px;
    cursor: pointer;
    border: none;
    text-transform: uppercase;
  }

  #last-pr{
    font-size: 14px;
    padding: 20px;
  }

  .last-pr__summary{
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  #park-run-latest{
    align-items: flex-start;
    width: 100%;
  }

  #last-pr__date{
    margin-bottom: 10px;
  }

  #last-pr__name{
    width: 100%;
  }

  .last-pr__metric{
    width: 225px;
    font-size: 25px;
  }

  #last-pr__pace{
    margin-right: 10px;
  }

  #pr-list {
    margin: 0 20px;
  }
</style>
