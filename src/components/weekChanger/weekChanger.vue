<template src="./weekChanger.html"></template>
<style scoped src='./weekChanger.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weekChanger',
  components: {
  },
  mixins: [ renderData ],
  data () {
    return {
      weekInViewIndex: 0,
      dayHasActivities: false,
      toggleWeekView: true
    }
  },
  created() {
  },
  methods: {
    changeWeek: function (num) {
      this.weekInViewIndex += num;
      if (this.weekInViewIndex < 0) {
        this.weekInViewIndex = 0
      }
      this.$emit('weekInViewIndexChange', this.weekInViewIndex);
    }
  },
  computed: {
    weekInViewString: function () {
      // TODO elment numbers is not necessary 'THIS WEEK' or 'NEXT WEEK'. Need to date check!
      if (this.weekInViewIndex <= 0) {
        return "THIS WEEK";
      }
      if (this.weekInViewIndex === 1 ) {
        return "LAST WEEK";
      } 
      if (this.weekInViewIndex > 1) {
        return "ACTUAL DATE"
        // return this.renderDate(this.weekInView[0].start_date, "short");
      }
    }
  }
}
</script>
