<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import activityItem from '../../components/activityItem/activityItem.vue'
import searchBar from '../../components/searchBar/searchBar.vue'
import filterBar from '../../components/filterBar/filterBar.vue'

export default {
  name: 'activities',
  components: {
    'nav-bar': navBar,
    'activity-item': activityItem,
    'search-bar': searchBar,
    'filter-bar': filterBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITIES',
      wordToSearch: '',
      showSwims: true,
      showRides: true,
      showRuns: true,
      showFilters: false,
      showSearch: false
    }
  },

  methods: {
    filterWithSearchWord: function (searchWord) {
      this.wordToSearch = searchWord;
    },
    setSwimFilter: function(showSwims){
      this.showSwims = showSwims;
    },
    setRideFilter: function(showRides){
      this.showRides = showRides;
    },
    setRunFilter: function(showRuns){
      this.showRuns = showRuns;
    },
    filterByActivities: function(activities){
      return activities.filter(activity => {
        return activity.type === "Swim" && this.showSwims ||
               activity.type === "Ride" && this.showRides || 
               activity.type === 'VirtualRide' && this.showRides ||
               activity.type === "Run" && this.showRuns;
      });
    },
    expandFilters: function(){
      this.showFilters = !this.showFilters;
    },
    expandSearch: function(){
      this.showSearch = !this.showSearch;
    }
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    },
    filteredActivities: function(){
      if (!this.activities && !this.wordToSearch) return;
      const filteredActivitiesByWordSearch = this.activities.filter(activity => {
        return activity.name.toLowerCase().includes(this.wordToSearch.toLowerCase())
      });
      return this.filterByActivities(filteredActivitiesByWordSearch);
    },
  }
}
</script>


