<template src='./parkRunSplits.html'></template>
<style scoped src='./parkRunSplits.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import subNavBar from '../../components/subNavBar/subNavBar.vue'
import renderData from '../../mixins/renderData.js'
import activity from '../../components/activity/activity.vue'

export default {
  name: 'parkRunSplits',
  components: {
    'nav-bar': navBar,
    'activity': activity,
    'subNavBar': subNavBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'PARK RUN SPLITS',
    }
  },
  mounted () {
    this.$store.dispatch('fetchFullParkRuns');
  },

  created() {
    },

  methods: {
    
    },
  computed: {

  }
}
</script>


