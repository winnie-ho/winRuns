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
      yearInView: new Date().getFullYear()
    };
  },
  created() {
    const zeroedMonth =
      this.currentMonthIndex + 1 < 10
        ? `0${this.currentMonthIndex + 1}`
        : `${this.currentMonthIndex + 1}`;

    const initBeforeMarker =
      new Date(
        `${this.currentYear}-${zeroedMonth}-${this.daysInMonthInView}`
      ).getTime() / 1000;

    const initAfterMarker =
      new Date(`${this.currentYear}-${zeroedMonth}-01`).getTime() / 1000;

    this.$emit("onMonthChange", {
      before: initBeforeMarker,
      after: initAfterMarker
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
      const zeroedMonth =
        this.monthInViewIndex + 1 < 10
          ? `0${this.monthInViewIndex + 1}`
          : `${this.monthInViewIndex + 1}`;

      return (
        new Date(
          `${this.yearInView}-${zeroedMonth}-${this.daysInMonthInView}`
        ).getTime() / 1000
      );
    },
    getAfterMarker() {
      const zeroedMonth =
        this.monthInViewIndex + 1 < 10
          ? `0${this.monthInViewIndex + 1}`
          : `${this.monthInViewIndex + 1}`;
      return new Date(`${this.yearInView}-${zeroedMonth}-01`).getTime() / 1000;
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
        `${this.yearInView}-${this.monthInViewIndex + 1}`,
        "YYYY-MM"
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
