<template>
  <div class='main-stat' v-bind:class='{ expanded: expandToggle }' v-on:click='expandToggle = !expandToggle'>
    <div class='main-stat--title'>
      {{ title }}
      </div>
    <div class='main-stat--value'>{{ statType.count }}</div>

    <div v-show='expandToggle' class='expanded-stat'>
      <div>Distance: {{ (statType.distance/1000).toFixed(0) }} km</div>
      <div>Time: {{ (statType.elapsed_time/3600).toFixed(0) }} hours</div>
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
  justify-content: flex-start;
  border: dashed lightslategray 1px;
  max-width: 200px;
  min-width: 100px;
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
