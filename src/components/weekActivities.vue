<template>
  <div id='week-activities'>
    <div id='week' class='row sb'>
      <div class="heading" id="dateInView">{{ weekInViewString }}</div>
      <div class='row'>
        <div v-on:click='changeWeek(1)' class='arrow'><strong><</strong></div>
        <div v-on:click='changeWeek(-1)' class='arrow'><strong>></strong></div>
      </div>
    </div>

    <div id="week-totals" class="row sb">
      <div id='weather-now'>
        {{ weatherNowMain }}
        {{ renderDegTemp(weatherNowTemp) }}
      </div>
      <div class='row week-total-stat'>
        <img class='icon dark-icon' src='../assets/icon_distance.png'/>
        {{ weekDistance }}
      </div>
      <div class='row week-total-stat'>
        <img class='icon dark-icon' src='../assets/icon_time.png'/>
        {{ renderTime(weekTime) }}
      </div>
    </div>

    <div id='week-container'>
      <div class='day-bar' v-for='day in dayLookUp' :key='day.index'>
        <div class='day-title'>
          {{ (day.substr(0, 3)).toUpperCase() }}
        </div>
        <div class='day' v-for='activity in dayActivities(day)' :key='activity.index'>
          <div class='heading'>{{ activity.name }}</div>
          <div class='row data-metric'>
            {{ renderDistance(activity.distance) }}  
            {{ renderTime(activity.moving_time) }}  
            {{ renderPace(activity.moving_time, activity.distance) }}
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
    dayActivities: function (day) {
      if (!this.weekInView) return
      const dayIndex = Object.keys(this.dayLookUp).find(key => this.dayLookUp[key] === day);

      let realIndex = parseInt(dayIndex) + 1
      if (dayIndex == 6) {
        realIndex = 0
      }
      if (!this.weekInView) return
      return this.weekInView.filter(activity => new Date(activity.start_date).getDay() === realIndex).sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
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
        return this.renderDate(this.weekInView[0].start_date, "short");
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
      let weekDistance = this.weekInView.reduce((acc, activity ) => acc + activity.distance, 0);
      return (weekDistance/1000).toFixed(0) + "km"
    },
    weekTime: function() {
      if (!this.weekInView) return;
      return this.weekInView.reduce((acc, activity ) => acc + activity.moving_time, 0);
    },
    weatherNowTemp: function() {
      if (!this.$store.state.weatherNow.main) return
      return this.$store.state.weatherNow.main.temp
    },
    weatherNowMain: function (){
      if (!this.$store.state.weatherNow.weather) return
      return this.$store.state.weatherNow.weather[0].main
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
    padding: 5px;
  }

  #week-header{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    height: 40px;
  }

  #week-totals{
    margin: 1px;
    border-radius: 3px;
  }

  .week-total-stat{
    border-right: gray 1px solid;
    width: 120px;
    padding: 15px 0;
  }

  .day-bar {
    background-color: white;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 5px 0;
    box-shadow: 2px 5px 30px rgb(156, 159, 161);
    height: calc(100vh /10);
    width: 100vw;
    overflow-x: scroll;
    overflow-y: hidden;

    animation-name: day-settle--active;
    animation-duration: 2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }

  .day-title {
    display: flex;
    background-color: rgba(31, 97, 141, 0.7);
    padding: 10px;
    height: 100%;
    min-width: 45px;
    align-content: center;
    align-items: center;
    justify-content: center;
  }

  .day{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 10px;
    pointer-events: none;
    color: #2c3e50;
  }

  .arrow{
    padding: 0 10px;
  }

  @keyframes day-settle {
    from {
      width: 0px; 
    }
    to {
      width: 50px;
    }
  }

  @keyframes day-settle--active {
    from {
      width: 37px; 
      color: transparent
    }
    to {
      width: 100%;
      color: white;
    }
  }

</style>
