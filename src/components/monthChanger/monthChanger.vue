<template src='./monthChanger.html'></template>
<style scoped src='./monthChanger.css'></style>

<script>
import moment from 'moment';
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'monthChanger',
  mixins: [renderData, appData],
  data() {
    return {
      monthInViewIndex: new Date().getMonth(),
      monthInViewString: '',
      yearInView: new Date().getFullYear(),
      rawTimeInView: new Date(),
    };
  },
  created() {
    const zeroedMonth = this.getZeroedMonth(this.currentMonthIndex - 1);
    const initBeforeMarker = new Date(
      this.currentYear,
      zeroedMonth,
      this.daysInMonthInView,
      0,
      0,
      0,
    );

    const initAfterMarker = new Date(this.yearInView, zeroedMonth, 1, 0, 0, 0);
    this.$emit('onMonthChange', {
      before: initBeforeMarker.getTime() / 1000,
      after: initAfterMarker.getTime() / 1000,
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

      this.monthInViewString = this.monthLookUp[this.monthInViewIndex];

      const timeMarkers = {
        before: this.getBeforeMarker(),
        after: this.getAfterMarker(),
      };
      this.$emit('onMonthChange', timeMarkers);

      const zeroedMonth = this.getZeroedMonth(this.monthInViewIndex);
      this.rawTimeInView = new Date(`${this.yearInView}-${zeroedMonth}-01`);
    },
    setMonthInView() {
      this.monthInViewIndex = this.rawTimeInView.getMonth();
      this.yearInView = this.rawTimeInView.getFullYear();

      const timeMarkers = {
        before: this.getBeforeMarker(),
        after: this.getAfterMarker(),
      };
      this.$emit('onMonthChange', timeMarkers);
    },
    getBeforeMarker() {
      const zeroedMonth = this.getZeroedMonth(this.monthInViewIndex - 1);
      return (
        new Date(
          this.yearInView,
          zeroedMonth,
          this.daysInMonthInView,
          23,
          59,
          59,
        ).getTime() / 1000
      );
    },

    getAfterMarker() {
      const zeroedMonth = this.getZeroedMonth(this.monthInViewIndex);
      return new Date(`${this.yearInView}-${zeroedMonth}-01`).getTime() / 1000;
    },
    getZeroedMonth(rawMonth) {
      return rawMonth + 1 < 10 ? `0${rawMonth + 1}` : `${rawMonth + 1}`;
    },
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
        'YYYY-MM',
      ).daysInMonth();
    },
    disableForwardArrow() {
      return (
        this.monthInViewIndex === this.currentMonthIndex
        && this.yearInView === this.currentYear
      );
    },
  },
};
</script>
