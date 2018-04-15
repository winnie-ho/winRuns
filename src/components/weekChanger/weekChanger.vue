<template src="./weekChanger.html"></template>
<style scoped src='./weekChanger.css'></style>

<script>
export default {
  name: 'weekChanger',
  data () {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false,
      toggleWeekView: true
    }
  },
  methods: {
    changeWeek: function (num) {
      this.weekInViewIndex += num;
      if (this.weekInViewIndex < 0) {
        this.weekInViewIndex = 0;
      }
      this.$emit('weekInViewIndexChange', this.weekInViewIndex);
    }
  },
  computed: {
    lastMonday: function () {
      const todayDate = new Date();
      const msHour = 60 * 60 * 1000;
      const timeNowZeroed = todayDate.setHours(0,0,0,0);
      const todayDay = todayDate.getDay();
      const diff = (todayDay - (todayDay === 0 ? -6 : 1));
      return new Date(timeNowZeroed - (diff * 24 * msHour));
    },
    mondayInView: function () {
      return new Date(this.lastMonday - (this.weekInViewIndex * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString();
    },
    weekInViewString: function () {
      if (this.weekInViewIndex <= 0) {
        return "THIS WEEK";
      }
      if (this.weekInViewIndex === 1 ) {
        return "LAST WEEK";
      } 
      if (this.weekInViewIndex > 1) {
        return this.mondayInView;
      }
    }
  }
}
</script>
