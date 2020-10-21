<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import activityItem from '../../components/activityItem/activityItem.vue';
import searchBar from '../../components/searchBar/searchBar.vue';
import filterBar from '../../components/filterBar/filterBar.vue';
import monthChanger from '../../components/monthChanger/monthChanger.vue';
import triStatsBar from '../../components/triStatsBar/triStatsBar.vue';
import monthPaceHR from '../../components/monthPaceHR/monthPaceHR.vue';

export default {
  name: 'activities',
  components: {
    navBar,
    activityItem,
    searchBar,
    filterBar,
    monthChanger,
    triStatsBar,
    monthPaceHR,
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
      toggleSortChron: false,
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
    showToolButtons() {
      this.viewToolButtons = !this.viewToolButtons;
    },
    hideToolButtons() {
      this.viewToolButtons = false;
      this.showFilters = false;
      this.showSearch = false;
    },
    toggleSortOrder() {
      this.toggleSortChron = !this.toggleSortChron;
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
    orderedFilteredActivities() {
      return this.toggleSortChron ? this.filteredActivities.sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) : this.filteredActivities.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    },
  },
};
</script>
