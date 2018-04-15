<template src="./weekActivities.html"></template>
<style scoped src='./weekActivities.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weekActivities',
  components: {
  },
  mixins: [ renderData ],
  props: [ 'mondayInView', 'activities' ],
  data () {
    return {
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
    },
    triggerWeekView: function () {
      console.log("TRIGGER", this.toggleWeekView)
      this.toggleWeekView = !this.toggleWeekView
      this.$emit('toggleWeekViewStatus')
    }
  },
  computed: {
    weekInView: function () {
      if (!this.activities.length) return
      if (!this.mondayInView) return
    
      let lastMonday = new Date(this.mondayInView).getTime();
      let nextMonday = lastMonday + (7 * 24 * 60 * 60 * 1000);
      return this.activities.filter(activity => new Date(activity.start_date) >= lastMonday && new Date(activity.start_date) < nextMonday);
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
    weekActivitiesCount: function () {
      if (!this.weekInView) return
      return this.weekInView.length
    }
  }
}
</script>
