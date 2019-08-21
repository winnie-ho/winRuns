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
      dayHasActivities: false
    };
  },
  mounted() {
    this.$emit("onMonthChange", {
      before: new Date().getTime() / 1000,
      after:
        new Date(
          `${this.currentYear}-${this.currentMonthIndex + 1}-1`
        ).getTime() / 1000
    });
  },
  methods: {
    changeMonth(num) {
      this.monthInViewIndex += num;
      if (this.monthInViewIndex === -1) {
        this.monthInViewIndex = 11;
        this.yearInView -= 1;
      }
      if (this.monthInViewIndex === 12) {
        this.monthInViewIndex = 0;
        this.yearInView += 1;
      }

      const timeMarkers = {
        before: this.getBeforeMarker(),
        after: this.getAfterMarker()
      };
      this.$emit("onMonthChange", timeMarkers);
    },
    getBeforeMarker() {
      return (
        new Date(
          `${this.yearInView}-${this.monthInViewIndex + 1}-${
            this.daysInMonthInView
          }`
        ).getTime() / 1000
      );
    },
    getAfterMarker() {
      return (
        new Date(
          `${this.yearInView}-${this.monthInViewIndex + 1}-1`
        ).getTime() / 1000
      );
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
      return this.monthLookUp[this.monthInViewIndex];
    },
    currentYear() {
      return this.today.getFullYear();
    },
    daysInMonthInView() {
      return moment(
        `${this.yearInView}-${this.monthInViewIndex + 1}`
      ).daysInMonth();
    },
    forwardArrowDisable() {
      return (
        this.monthInViewIndex === this.currentMonthIndex &&
        this.yearInView === this.currentYear
      );
    }
  }
};
</script>
