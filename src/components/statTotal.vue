<template>
  <div class='main-stat' v-bind:class='{ expanded: expandToggle }' v-on:click='expandToggle = !expandToggle'>
    <div class='main-stat--title'>
      {{ title }}
      </div>
    <div class='main-stat--value'>{{ statTypeCount }}</div>

    <div v-show='expandToggle' class='expanded-stat'>
      <div class='expanded-stat-item'>
        <img class='icon dark-icon' src='../assets/icon_distance.png'/>
        {{ renderDistance(statTypeDistance,'short') }}
      </div>
      <div class='expanded-stat-item'>
        <img class='icon dark-icon' src='../assets/icon_time.png'/>
        {{ renderTime(statTypeTime, 'short') }}
      </div>
      <div class='expanded-stat-item'>
        <img class='icon dark-icon' src='../assets/icon_elevation.png'/>
        {{ renderDistance(statTypeElevation, 'short') }}
      </div>
    </div>
  </div>
</template>

<script>
import renderData from '../mixins/renderData.js'
export default {
  name: "statTotal",
  mixins: [ renderData ],
  data() {
    return {
      expandToggle: false,
      lastYear: 510
    };
  },

  props: {
    type: {
      type: String,
      required: true
    }
  },

  created() {
  },

  methods: {},

  computed: {
    title: function() {
      return (this.type + 's').toUpperCase();
    },
    statType: function() {
      if (!this.$store.state.stats) return
      switch(this.type) {
        case 'run':
          return this.$store.state.stats.ytd_run_totals
          break;
        case 'ride':
          return this.$store.state.stats.ytd_ride_totals
          break;
        case 'swim':
          return this.$store.state.stats.ytd_swim_totals
          break;
      }
    },
    statTypeCount: function() {
      if (!this.statType) return
      return this.statType.count
    },
    statTypeDistance: function() {
      if (!this.statType) return
      return this.statType.distance
    },
    statTypeTime: function() {
      if (!this.statType) return
      return this.statType.moving_time
    },
    statTypeElevation: function() {
      if (!this.statType) return
      return this.statType.elevation_gain
    }
  }
};
</script>

<style scoped>
.main-stat {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 200px;
  min-width: 100px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.main-stat--value {
  font-size: 24px;
}

.expanded {
}

.expanded-stat {
  margin-top: 10px;
  animation-name: expand-vertical;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.expanded-stat-item {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
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
