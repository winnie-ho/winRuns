<template src="./weekActivitiesMini.html"></template>
<style scoped src='./weekActivitiesMini.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weekActivitiesMini',
  components: {
  },
  mixins: [ renderData ],
  props: [ 'weekInView' ],
  data () {
    return {
      dayHasActivities: false,
      toggleWeekView: false
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
      return dayActivities;
    },
    triggerWeekView: function () {
      this.toggleWeekView = !this.toggleWeekView
      this.$emit('toggleWeekViewChange', this.toggleWeekView);
    },
    dayActivityCount: function (day) {
      console.log("day", day)
      return day.length;
    }
  },
  computed: {
  }
}
</script>
