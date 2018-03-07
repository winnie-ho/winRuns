<template>
  <div class='main-stat' v-bind:class='{ expanded: expandToggle }' v-on:click='expandToggle = !expandToggle'>
    <div class='main-stat--title'>
      {{ title }}
      </div>
    <div class='main-stat--value'>{{ statType.count }}</div>

    <div v-show='expandToggle' class='expanded-stat'>
      <div class='expanded-stat-item'>
        <img class='stat-icon' src='../assets/icon_distance.png'/>
        {{ (statType.distance/1000).toFixed(0) }} km
      </div>
      <div class='expanded-stat-item'>
        <img class='stat-icon' src='../assets/icon_time.png'/>
        {{ (statType.moving_time/3600).toFixed(0) }} hours
      </div>
      <div class='expanded-stat-item'>
        <img class='stat-icon' src='../assets/icon_elevation.png'/>
        {{ (statType.elevation_gain/1000).toFixed(0) }} m
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statTotal",
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
  mounted() {
    // this.thisYear = document.getElementById('last-year-bar').offsetWidth
  },
  created() {
  },
  methods: {},
  computed: {
    title: function() {
      return (this.type + 's').toUpperCase();
    },
    statType: function() {
      switch(this.type) {
        case 'run':
          return this.$store.state.runStats
          break;
        case 'ride':
          return this.$store.state.rideStats
          break;
        case 'swim':
          return this.$store.state.swimStats
          break;
      }
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

.main-stat--title {
}

.main-stat--value {
  font-size: 24px;
}

.expanded {
  background-color: rgb(212, 217, 221, 0.5);
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

.stat-icon {
  height: 20px;
  width: auto;
  filter: invert(60%);
  padding: 5px;
}
</style>
