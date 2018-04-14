<template src="./weekTotals.html"></template>
<style scoped src='./weekTotals.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weekTotals',
  components: {
  },
  mixins: [ renderData ],
  data () {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false,
      toggleWeekView: true
    }
  },
  created() {
  },
  methods: {
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
    weekDistance: function() {
      if (!this.weekInView) return;
      let weekDistance = this.weekInView.reduce((acc, activity ) => acc + activity.distance, 0);
      return (weekDistance/1000).toFixed(0) + "km"
    },
    weekTime: function() {
      if (!this.weekInView) return;
      return this.weekInView.reduce((acc, activity ) => acc + activity.moving_time, 0);
    },
    weekActivitiesCount: function () {
      if (!this.weekInView) return
      return this.weekInView.length
    }
  }
}
</script>
