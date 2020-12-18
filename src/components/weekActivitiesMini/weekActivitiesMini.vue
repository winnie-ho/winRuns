<template src='./weekActivitiesMini.html'></template>
<style scoped src='./weekActivitiesMini.css'></style>

<script>
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import appData from '../../mixins/appData';

export default {
  name: 'weekActivitiesMini',
  mixins: [renderData, changePage, appData],
  props: ['activitiesInWeek'],
  data() {
    return {
      dayHasActivities: false,
      toggleWeekView: false,
    };
  },
  methods: {
    dayActivities(day) {
      if (!this.activitiesInWeek) return;
      const dayIndex = Object.keys(this.dayLookUp).find(
        key => this.dayLookUp[key] === day,
      );

      let realIndex = parseInt(dayIndex) + 1;
      if (dayIndex == 6) {
        realIndex = 0;
      }
      return this.activitiesInWeek.filter(
        activity => new Date(activity.start_date_local).getDay() === realIndex,
      );
    },
    triggerWeekView() {
      this.toggleWeekView = !this.toggleWeekView;
      this.$emit('toggleWeekViewChange', this.toggleWeekView);
    },
    activityTypeIcon(activity) {
      const baseURL = '../../../static/assets'
      switch (activity.type) {
        case 'Swim':
          return `${baseURL}/svgs/icon_swim--light.svg`;
          break;
        case 'Ride' || 'VirtualRide':
          return `${baseURL}/svgs/icon_bike--light.svg`;
          break;
        case 'Run':
          return `${baseURL}/svgs/icon_run--light.svg`;
          break;
        case 'Workout':
          return `${baseURL}/icon_activities--light.png`;
          break;
      }
    }
  },
};
</script>
