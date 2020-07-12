<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import activityItem from '../../components/activityItem/activityItem.vue';
import searchBar from '../../components/searchBar/searchBar.vue';
import filterBar from '../../components/filterBar/filterBar.vue';
import monthChanger from '../../components/monthChanger/monthChanger.vue';
import monthStats from '../../components/monthStats/monthStats.vue';
import monthHR from '../../components/monthHR/monthHR.vue';

export default {
  name: 'activities',
  components: {
    navBar,
    activityItem,
    searchBar,
    filterBar,
    monthChanger,
    monthStats,
    monthHR,
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: 'ACTIVITIES',
      wordToSearch: '',
      showSwims: true,
      showRides: true,
      showRuns: true,
      showWorkouts: true,
      showFilters: false,
      showSearch: false,
      monthInView: '',
      beforeDate: '',
      afterDate: '',
      viewToolButtons: false,
    };
  },
  methods: {
    filterWithSearchWord(searchWord) {
      this.wordToSearch = searchWord;
    },
    setSwimFilter(showSwims) {
      this.showSwims = showSwims;
    },
    setRideFilter(showRides) {
      this.showRides = showRides;
    },
    setRunFilter(showRuns) {
      this.showRuns = showRuns;
    },
    setWorkoutFilter(showWorkouts) {
      this.showWorkouts = showWorkouts;
    },
    filterByActivities(activities) {
      return activities.filter(
        activity => (activity.type === 'Swim' && this.showSwims)
        || (activity.type === 'Ride' && this.showRides)
        || (activity.type === 'VirtualRide' && this.showRides)
        || (activity.type === 'Run' && this.showRuns)
        || (activity.type === 'Workout' && this.showWorkouts),
      );
    },
    expandFilters() {
      this.showFilters = !this.showFilters;
    },
    expandSearch() {
      this.showSearch = !this.showSearch;
    },
    fetchMonthActivities(timeMarkers) {
      const options = {
        before: timeMarkers.before,
        after: timeMarkers.after,
        activitiesPerPage: 200,
        pageRequests: 1,
      };

      this.$store.dispatch('fetchActivitiesInPeriod', options);
    },
    setMonthInView(timeMarkers) {
      if (!timeMarkers.before) {
        this.monthInView = this.monthLookUp[new Date().getMonth + 1];
      } else {
        const month = this.monthLookUp[
          new Date(new Date(0).setUTCSeconds(timeMarkers.before)).getMonth()
        ]
          .toUpperCase()
          .substr(0, 3);

        this.monthInView = month;
      }
    },
    setMonth(timeMarkers) {
      this.fetchMonthActivities(timeMarkers);
      this.setMonthInView(timeMarkers);
    },
    getStatCount(activityType) {
      return this.filteredActivities.filter(
        activity => activity.type === activityType,
      ).length;
    },
    getStatValue(activityType, statMetric) {
      return this.filteredActivities
        .filter(activity => activity.type === activityType)
        .reduce((total, i) => total + i[statMetric], 0);
    },
    showToolButtons() {
      this.viewToolButtons = !this.viewToolButtons;
    },
    hideToolButtons() {
      this.viewToolButtons = false;
      this.showFilters = false;
      this.showSearch = false;
    },
  },
  computed: {
    activitiesByMonth() {
      return this.$store.state.activitiesInPeriod;
    },
    filteredActivities() {
      if (this.activitiesByMonth && this.wordToSearch) {
        const filteredActivitiesByWordSearch = this.activitiesByMonth.filter(
          activity => activity.name.toLowerCase()
            .includes(this.wordToSearch.toLowerCase()),
        );
        return this.filterByActivities(filteredActivitiesByWordSearch);
      }

      if (
        this.activitiesByMonth
        && !this.wordToSearch
        && (this.showSwims || this.showRides || this.showRuns || this.showWorkouts)
      ) {
        return this.filterByActivities(this.activitiesByMonth);
      }

      return [];
    },
    stats() {
      return this.filteredActivities && {
        swim: {
          count: this.getStatCount('Swim'),
          distance: this.getStatValue('Swim', 'distance'),
          elapsed_time: this.getStatValue('Swim', 'elapsed_time'),
          elevation_gain: this.getStatValue('Swim', 'total_elevation_gain'),
          moving_time: this.getStatValue('Swim', 'moving_time'),
        },
        ride: {
          count: this.getStatCount('Ride'),
          distance: this.getStatValue('Ride', 'distance'),
          elapsed_time: this.getStatValue('Ride', 'elapsed_time'),
          elevation_gain: this.getStatValue('Ride', 'total_elevation_gain'),
          moving_time: this.getStatValue('Ride', 'moving_time'),
        },
        run: {
          count: this.getStatCount('Run'),
          distance: this.getStatValue('Run', 'distance'),
          elapsed_time: this.getStatValue('Run', 'elapsed_time'),
          elevation_gain: this.getStatValue('Run', 'total_elevation_gain'),
          moving_time: this.getStatValue('Run', 'moving_time'),
        },
      };
    },
  },
};
</script>
