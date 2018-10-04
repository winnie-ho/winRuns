<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import activity from '../../components/activity/activity.vue'
import searchBar from '../../components/searchBar/searchBar.vue'
import filterBar from '../../components/filterBar/filterBar.vue'

export default {
  name: 'activities',
  components: {
    'nav-bar': navBar,
    'activity': activity,
    'search-bar': searchBar,
    'filter-bar': filterBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITIES',
      wordToSearch: '',
      showSwims: false,
      showRides: false,
      showRuns: false
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
      if (this.showSwims) {
        return activities.filter(activity => activity.type === "Swim")
      }
      if (this.showRides) {
        return activities.filter(activity => activity.type === "Ride")
      }
      if (this.showRuns) {
        return activities.filter(activity => activity.type === "Run")
      }
      return activities;
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


