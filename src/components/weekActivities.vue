<template>
  <div id='week-activities'>
    <div id="week-header">
      <div v-on:click='changeWeek(1)'><strong><</strong></div>
        <div class="heading" id="dateInView">{{ weekInViewString }}</div>
      <div v-on:click="changeWeek(-1)" id="previous"><strong>></strong></div>
    </div>

    <div id='week-totals'>
      <img class='icon dark-icon' src='../assets/icon_distance.png'/>
      {{ renderDistance(weekDistance) }}
    </div>
    <div id='week-container'>
      <div class='day-bar' v-for='day in dayLookUp' :key='day.index'>
        <div class='day-title'>
          {{ (day.substr(0, 3)).toUpperCase() }}
        </div>
        <div class='day'>
          <strong>{{ renderDay(day, 'name') }}</strong>
          <div class='row'>
            {{ renderDistance(renderDay(day, 'distance')) }}  
            {{ renderTime(renderDay(day, 'moving_time')) }}  
            {{ renderPace(renderDay(day, 'moving_time'), renderDay(day, 'distance')) }}
          </div>
        </div>
      </div>
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
      weekInViewIndex: 0
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
    },
    renderDay: function (day, prop) {
      if (!this.weekInView) return
      const dayIndex = Object.keys(this.dayLookUp).find(key => this.dayLookUp[key] === day);

      let realIndex = parseInt(dayIndex) + 1
      if (dayIndex == 6) {
        realIndex = 0
      }
      let result = this.weekInView.find(activity => new Date(activity.start_date).getDay() === realIndex)
      if (!result) return
      return result[prop]
    }
  },
  computed: {
    activities: function () {
      return this.$store.state.activities
    },
    weekInViewString: function () {
      if (this.weekInViewIndex <= 0) {
        return "THIS WEEK";
      }
      if (this.weekInViewIndex === 1 ) {
        return "LAST WEEK";
      } 
      if (this.weekInViewIndex > 1) {
        return this.renderDate(this.weekInView[0].start_date, "long");
      }
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
      let marker1 = lastMonday - ((this.weekInViewIndex - 1) * msInDay * 7)
      let marker2 = lastMonday - (this.weekInViewIndex * msInDay * 7)
      let weekActivities = this.activities.slice().filter(activity => {
        return (new Date(activity.start_date).getTime() < marker1) && (new Date(activity.start_date).getTime() >= marker2);
      });
      return weekActivities
    },
    weekDistance: function() {
      if (!this.weekInView) return;
      return this.weekInView.reduce((acc, activity ) => acc + activity.distance, 0);
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
    justify-content: flex-start;
    width: 90vw;
    align-items: center;
    margin: 10px 0;
  }

  .day-title {
    background-color: rgba(31, 97, 141, 0.7);
    padding: 10px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    display: flex;
    flex-direction: row;
    color: white;

    animation-name: day-settle;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    width: 60px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
  }

  .day{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 10px;
    width: 100%;
    pointer-events: none;
    font-size: 16px;
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
