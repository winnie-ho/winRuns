<template src="./weekActivitiesMini.html"></template>
<style scoped src='./weekActivitiesMini.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";
import appData from "../../mixins/appData.js";

export default {
  name: "weekActivitiesMini",
  mixins: [renderData, changePage, appData],
  props: ["weekInView"],
  data() {
    return {
      dayHasActivities: false,
      toggleWeekView: false
    };
  },
  methods: {
    computeImage(type) {
      return type === "ride";
    },
    dayActivities(day) {
      if (!this.weekInView) return;
      const dayIndex = Object.keys(this.dayLookUp).find(
        key => this.dayLookUp[key] === day
      );

      let realIndex = parseInt(dayIndex) + 1;
      if (dayIndex == 6) {
        realIndex = 0;
      }
      let dayActivities = this.weekInView.filter(
        activity => new Date(activity.start_date).getDay() === realIndex
      );
      let sortedDayActivities = dayActivities.sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
      );
      return dayActivities;
    },
    triggerWeekView() {
      this.toggleWeekView = !this.toggleWeekView;
      this.$emit("toggleWeekViewChange", this.toggleWeekView);
    },
    dayActivityCount(day) {
      return day.length;
    }
  }
};
</script>
