<template src="./weekChanger.html"></template>
<style scoped src='./weekChanger.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'weekChanger',
  mixins: [renderData, appData],
  data() {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false,
      toggleWeekView: true,
      forwardArrowDisable: false,
      msInWeek: 7 * 24 * 60 * 60 * 1000,
    };
  },
  created() {
    this.changeWeek(0);
  },
  methods: {
    changeWeek(num) {
      this.weekInViewIndex += num;
      if (this.weekInViewIndex < 0) {
        this.weekInViewIndex = 0;
      }
      const afterMarker = new Date(this.lastMonday - this.weekInViewIndex * this.msInWeek);
      const beforeMarker = new Date(this.lastMonday - (this.weekInViewIndex - 1) * this.msInWeek);

      this.getWeekInView(beforeMarker, afterMarker);
    },
    weekInViewString() {
      if (this.weekInViewIndex <= 0) {
        this.forwardArrowDisable = true;
        return 'THIS WEEK';
      }
      if (this.weekInViewIndex === 1) {
        this.forwardArrowDisable = false;
        return 'LAST WEEK';
      }
      this.forwardArrowDisable = false;
      const date = new Date(this.lastMonday - this.weekInViewIndex * this.msInWeek);
      return this.renderDate(date, 'long');
    },
    getWeekInView(beforeMarker, afterMarker) {
      this.$emit('weekInViewChange', {
        before: new Date(beforeMarker).getTime() / 1000,
        after: new Date(afterMarker).getTime() / 1000,
      });
    },
  },
  computed: {
    lastMonday() {
      const todayDate = new Date();
      const msHour = 60 * 60 * 1000;
      const timeNowZeroed = todayDate.setHours(0, 0, 0, 0);
      const todayDay = todayDate.getDay();
      const diff = todayDay - (todayDay === 0 ? -6 : 1);
      return new Date(timeNowZeroed - diff * 24 * msHour);
    },
  },
};
</script>
