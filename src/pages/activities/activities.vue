<template src='./activities.html'></template>
<style scoped src='./activities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'

export default {
  name: 'activities',
  components: {
    'nav-bar': navBar
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
    viewActivity: function (activityId) {
      this.$store.dispatch('fetchActivity', activityId)
      this.$store.dispatch('fetchKudos', activityId)
      this.$store.dispatch('fetchPhotos', activityId)
      this.$store.dispatch('fetchComments', activityId).then(() => {
        this.$router.push('/activity/' + activityId)
      })
    }
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    }
  }
}
</script>


