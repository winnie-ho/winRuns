<template src='./weekActivities.html'></template>
<style scoped src='./weekActivities.css'></style>

<script>
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';

export default {
  name: 'weekActivities',
  mixins: [renderData, changePage],
  props: ['activitiesInWeek', 'toggleWeekView'],
  data() {
    return {
      dayHasActivities: false,
    };
  },
  methods: {
    dayActivities(day) {
      if (!this.activitiesInWeek) return;
      const dayIndex = Object.keys(this.dayLookUp).find(
        key => this.dayLookUp[key] === day,
      );

      let realIndex = parseInt(dayIndex) + 1;
      if (dayIndex === 6) {
        realIndex = 0;
      }
      const dayActivities = this.activitiesInWeek
        .filter(
          activity => new Date(activity.start_date).getDay() === realIndex,
        )
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

      if (dayActivities.length === 0) {
        this.dayHasActivities = true;
      }
      return this.activitiesInWeek && dayActivities;
    },
  },
};
</script>
