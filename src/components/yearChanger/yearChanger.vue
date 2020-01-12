<template src='./yearChanger.html'></template>
<style scoped src='./yearChanger.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'yearChanger',
  mixins: [renderData, appData],
  data() {
    return {
      yearInView: new Date().getFullYear(),
      rawTimeInView: new Date(),
    };
  },
  methods: {
    changeYear(num) {
      this.yearInView += num;
      if (this.yearInView > this.currentYear) {
        this.yearInView = this.currentYear;
      } else if (this.yearInView < 2011) {
        this.yearInView = 2011;
      }
      this.rawTimeInView = new Date(`${this.yearInView}`);
      this.$emit('onYearChange', this.yearInView);
    },
    setYearInView() {
      this.yearInView = this.rawTimeInView.getFullYear();
      this.$emit('onYearChange', this.yearInView);
    },
  },
  computed: {
    currentYear() {
      return new Date(new Date().getFullYear());
    },
  },
};
</script>
