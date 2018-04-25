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
      pageTitle: 'ACTIVITIES'
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {

  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    }
  }
}
</script>


