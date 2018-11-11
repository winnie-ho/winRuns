<template src='./parkRunActivities.html'></template>
<style scoped src='./parkRunActivities.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import parkRunSubBar from '../../components/parkRunSubBar/parkRunSubBar.vue'
import renderData from '../../mixins/renderData.js'
import activityItem from '../../components/activityItem/activityItem.vue'

export default {
  name: 'parkRunActivities',
  components: {
    'nav-bar': navBar,
    'activity-item': activityItem,
    'park-run-sub-bar': parkRunSubBar
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


