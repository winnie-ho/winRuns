<template src="./weekChanger.html"></template>
<style scoped src='./weekChanger.css'></style>

<script>
import renderData from "../../mixins/renderData";
import appData from "../../mixins/appData";

export default {
  name: "weekChanger",
  mixins: [renderData, appData],
  data() {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false,
      toggleWeekView: true,
      forwardArrowDisable: false
    };
  },
  methods: {
    changeWeek(num) {
      this.weekInViewIndex += num;
      if (this.weekInViewIndex < 0) {
        this.weekInViewIndex = 0;
      }
    },
    weekInViewString(mondayInView) {
      if (this.weekInViewIndex <= 0) {
        this.forwardArrowDisable = true;
        return "THIS WEEK";
      }
      if (this.weekInViewIndex === 1) {
        this.forwardArrowDisable = false;
        return "LAST WEEK";
      }
      if (this.weekInViewIndex > 1) {
        this.forwardArrowDisable = false;
        return mondayInView;
      }
    }
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
    mondayInView() {
      const mondayInView = new Date(
        this.lastMonday - this.weekInViewIndex * 7 * 24 * 60 * 60 * 1000
      );
      const mondayInViewString = this.renderDate(mondayInView, "long");
      this.$emit("mondayInViewChange", mondayInView);
      return mondayInViewString;
    }
  }
};
</script>
