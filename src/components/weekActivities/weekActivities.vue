<template src="./weekActivities.html"></template>
<style scoped src='./weekActivities.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weekActivities',
  components: {
  },
  mixins: [ renderData ],
  data () {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false
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
      let dayActivities = this.weekInView.filter(activity => new Date(activity.start_date).getDay() === realIndex).sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

      if (dayActivities.length === 0) {
        this.dayHasActivities = true
      }
      return dayActivities
    },
    countActivityType: function (type) {
      if (!this.weekInView) return
      return this.weekInView.filter(activity => activity.type === type).length
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
    },
    weekActivitiesCount: function () {
      if (!this.weekInView) return
      return this.weekInView.length
    }
  }
}
</script>
