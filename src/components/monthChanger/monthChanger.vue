<template src="./monthChanger.html"></template>
<style scoped src='./monthChanger.css'></style>

<script>
import renderData from "../../mixins/renderData";
import appData from "../../mixins/appData";
import moment from "moment";

export default {
  name: "monthChanger",
  mixins: [renderData, appData],
  data() {
    return {
      monthInViewIndex: new Date().getMonth(),
      yearInView: new Date().getFullYear(),
      dayHasActivities: false,
      toggleWeekView: true,
      forwardArrowDisable: false
    };
  },
  methods: {
    changeMonth(num) {
      this.monthInViewIndex += num;
      if (this.monthInViewIndex < 0) {
        this.monthInViewIndex = 11;
      }
      if (this.monthInViewIndex === 11) {
        this.monthInViewIndex = 0;
      }
      console.log("NUM", this.monthInViewIndex);
    }
  },
  computed: {
    today() {
      return new Date();
    },
    currentMonthIndex() {
      return this.today.getMonth();
    },
    currentMonthString() {
      return this.monthLookUp[this.currentMonthIndex];
    },
    currentYear() {
      return this.today.getYear();
    },
    daysInMonthInView() {
      return moment(
        `${this.yearInView}-${this.monthInViewIndex}`
      ).daysInMonth();
    },
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
        this.lastMonday - this.monthInViewIndex * 7 * 24 * 60 * 60 * 1000
      );
      const mondayInViewString = this.renderDate(mondayInView, "long");
      this.$emit("mondayInViewChange", mondayInView);
      return mondayInViewString;
    }
  }
};
</script>
