<template src='./parkRunActivities.html'></template>
<style scoped src='./parkRunActivities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import subNavBar from '../../components/subNavBar/subNavBar.vue'
import renderData from '../../mixins/renderData.js'
import activity from '../../components/activity/activity.vue'

export default {
  name: 'parkRunActivities',
  components: {
    'nav-bar': navBar,
    'activity': activity,
    'subNavBar': subNavBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'PARK RUNS',
    }
  },
  mounted () {
    
    },

  created() {
    },

  methods: {
    
    },
  computed: {
    parkRuns: function () {
      if (!this.$store.getters.parkRuns) return;
      return this.$store.getters.parkRuns;
    }
  }
}
</script>


