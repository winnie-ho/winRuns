<template>
  <div id='week-activities'>
    <div id="week-header">
      <div v-on:click='changeWeek(1)'><strong><</strong></div>
        <div class="heading" id="dateInView"></div>
      <div v-on:click="changeWeek(-1)" id="previous"><strong>></strong></div>
    </div>

    <div id='week-container'>
      <div class='day-bar' v-for='day in dayLookUp' :key='day.index'>
        <div class='day-title'>
          {{ (day.substr(0, 3)).toUpperCase() }}
        </div>
        <div class='day-content'>
          something
        </div>
      </div>
    </div>
    <div v-for='day in weekInView' :key='day.index'>
          {{ day.name }}
      </div>
  </div>
</template>

<script>
import renderData from '../mixins/renderData.js'

export default {
  name: 'weekActivities',
  components: {
  },
  mixins: [ renderData ],
  data () {
    return {
      weekInViewIndex: 0,
    }
  },
  created() {
  },
  methods: {
    changeWeek: function (num) {
      this.weekInViewIndex += num;
      if (this.weekInViewIndex < 0) {
        this.weekInViewIndex = 0
      }
    }
  },
  computed: {
    activities: function () {
      return this.$store.state.activities
    },
    weekInView: function () {
      if (!this.activities.length) return
    
      let lastMonday = ''
      const timeNow = new Date();
      const timeNowZeroed = timeNow.setHours(0,0,0,0);
      const msInDay = (24 * 60 * 60 * 1000);
      
      switch(new Date().getDay()) {
        case 0:
          lastMonday = timeNowZeroed - (6 * msInDay);
          break;
        case 1:
          lastMonday = timeNowZeroed - (7 * msInDay);
          break;
        case 2:
          lastMonday = timeNowZeroed - (1 * msInDay);
          break;
        case 3:
          lastMonday = timeNowZeroed - (2 * msInDay);
          break;
        case 4:
          lastMonday = timeNowZeroed - (3 * msInDay);
          break;    
        case 5:
          lastMonday = timeNowZeroed - (4 * msInDay);
          break;    
        case 6:
          lastMonday = timeNowZeroed - (5 * msInDay);
          break;
      }
      
      let marker1 = lastMonday + (7 * msInDay) - (this.weekInViewIndex * msInDay * 7)
      let marker2 = lastMonday - (this.weekInViewIndex * msInDay * 7)

      let weekActivities = this.activities.filter(activity => {
        return (new Date(activity.start_date).getTime() < marker1) && (new Date(activity.start_date).getTime() >= marker2);
      });
      
      return weekActivities
    }
  }
}
</script>

<style scoped>
  #week-activities {
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
  }

  #week-header{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    height: 40px;
  }

  .day-bar {
    display: flex;
    flex-direction: row;
    width: 90vw;
    align-items: center;
    padding: 5px 0;
  }

  .day-title {
    background-color: rgba(31, 97, 141, 0.7);
    padding: 10px 0;
    margin-right: 10px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    display: flex;
    flex-direction: row;
    color: white;

    animation-name: day-settle;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    width: 60px;
    height: 25px;
    align-content: center;
    align-items: center;
    justify-content: center;
  }


  @keyframes day-settle--active {
    from {
      width: 37px; 
      color: transparent
    }
    to {
      width: 79%;
      color: white;
    }
  }
</style>
