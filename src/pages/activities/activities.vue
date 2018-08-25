<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import activity from '../../components/activity/activity.vue'
import searchBar from '../../components/searchBar/searchBar.vue'

export default {
  name: 'activities',
  components: {
    'nav-bar': navBar,
    'activity': activity,
    'search-bar': searchBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITIES',
      wordToSearch: ''
    }
  },
  mounted () {
    this.$store.dispatch('fetchActivities', 200);
  },

  created() {
  },

  methods: {
    filterWithSearchWord: function (searchWord) {
      this.wordToSearch = searchWord;
    }
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    },
    filteredActivities: function(){
      if (!this.activities && !this.wordToSearch) return;
      return this.activities.filter(activity => {
        return activity.name.toLowerCase().includes(this.wordToSearch.toLowerCase())
      })
    },
  }
}
</script>


