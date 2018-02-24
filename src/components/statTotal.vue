<template>
  <div class='main-stat' v-bind:class='{ expanded: expandToggle }' v-on:click='expandToggle = !expandToggle'>
    <div class='main-stat--title'>{{ title }}</div>
    <div class='main-stat--value'>{{ statValue }}{{ unit }}</div>

    <div v-show='expandToggle' class='expanded-stat'>
      <div class='main-stat--title' v-for='month in ytdDistances'>
        {{ month.month }}: {{ month.distance }}km
      </div>
      <div id='last-year-bar' class='bar'>
        {{ lastYear }}
      </div>
      <div v-bind:style='_computeThisYearBar' class='this-year-bar bar'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statTotal',
  data () {
    return {
      title: 'Distance',
      statValue: '',
      unit: 'km',
      expandToggle: true,
      ytdDistances: [
        { month: 'Jan', distance: 20 },
        { month: 'Feb', distance: 30 },
        { month: 'March', distance: 15 }
      ],
      lastYear: 510,
      statDataResponse: {},
      
    }
  },
  mounted () {
    this.thisYear = document.getElementById('last-year-bar').offsetWidth
  },

  created () {
    this.$http.get('https://www.strava.com/api/v3/athletes/3752965/stats?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(function(data){
      console.log("DATA", data)
      this.statDataResponse = data.body.ytd_run_totals
      this.statValue = (this.statDataResponse.distance/1000).toFixed(0)
    })
  },

  methods: {
  },
  computed: {
    _computeThisYearBar: function () {
      return {
        width: (this.statValue / this.lastYear * this.thisYear) + 'px'
      }
    }
  }
}
</script>

<style scoped>
  .main-stat {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: dashed lightslategray 1px;
    max-width: 200px;
    text-align: center;
    font-size: 16px;
  }

  .main-stat--title {

  }

  .main-stat--value {
  }

  .expanded {
    background-color: white;
  }

  .expanded-stat {
    margin-top: 10px;
    animation-name: expand-vertical;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

@keyframes expand-vertical {
  from {
    height: 30px;
  }
  to {
    height: 90px;
  }
}

.bar {
  height: 20px;
}

#last-year-bar {
  position: relative;
  background-color: lightblue;
  width: 100%;
}

.this-year-bar {
  position: absolute;
  z-index: 2;
  margin-top: -20px;
  animation-name: expand-horizontal;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes expand-horizontal {
  from {
    background-color: lightblue;
  }
  to {
    background-color: rgba(31, 97, 141, 0.7);
  }
}
</style>
