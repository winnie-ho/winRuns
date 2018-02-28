<template>
  <div class='main-stat' v-bind:class='{ expanded: expandToggle }' v-on:click='expandToggle = !expandToggle'>
    <div class='main-stat--title'>{{ title }}</div>
    <div class='main-stat--value'>{{ stats.count }} {{ unit }}</div>

    <div v-show='expandToggle' class='expanded-stat'>
      <div class='main-stat--title' v-for='month in ytdDistances' :key='month.month'>
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
      statValue: '',
      expandToggle: false,
      ytdDistances: [
        { month: 'Jan', distance: 20 },
        { month: 'Feb', distance: 30 },
        { month: 'March', distance: 15 }
      ],
      lastYear: 510
    }
  },
  props: {
    stats: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.thisYear = document.getElementById('last-year-bar').offsetWidth
  },
  created () {
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
