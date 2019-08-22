<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import activityItem from "../../components/activityItem/activityItem.vue";
import searchBar from "../../components/searchBar/searchBar.vue";
import filterBar from "../../components/filterBar/filterBar.vue";
import monthChanger from "../../components/monthChanger/monthChanger.vue";

export default {
  name: "activities",
  components: {
    navBar,
    activityItem,
    searchBar,
    filterBar,
    monthChanger
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: "ACTIVITIES",
      wordToSearch: "",
      showSwims: true,
      showRides: true,
      showRuns: true,
      showWorkouts: true,
      showFilters: false,
      showSearch: false
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
      return activities.filter(activity => {
        return (
          (activity.type === "Swim" && this.showSwims) ||
          (activity.type === "Ride" && this.showRides) ||
          (activity.type === "VirtualRide" && this.showRides) ||
          (activity.type === "Run" && this.showRuns) ||
          (activity.type === "Workout" && this.showWorkouts)
        );
      });
    },
    expandFilters() {
      this.showFilters = !this.showFilters;
    },
    expandSearch() {
      this.showSearch = !this.showSearch;
    },
    fetchMonthActivities(timeMarkers) {
      this.$store.dispatch("fetchActivitiesByMonth", {
        before: timeMarkers.before,
        after: timeMarkers.after,
        pageNumber: 1,
        activitiesPerPage: 200
      });
    }
  },
  computed: {
    filteredActivities() {
      if (this.$store.state.activitiesByMonth && this.wordToSearch) {
        const filteredActivitiesByWordSearch = this.$store.state.activities.filter(
          activity => {
            return activity.name
              .toLowerCase()
              .includes(this.wordToSearch.toLowerCase());
          }
        );
        return this.filterByActivities(filteredActivitiesByWordSearch);
      }

      if (
        this.$store.state.activities &&
        !this.wordToSearch &&
        (this.showSwims || this.showRides || this.showRuns || this.showWorkouts)
      ) {
        return this.filterByActivities(this.$store.state.activitiesByMonth);
      }
    }
  }
};
</script>


