<template src='./parkRunSplits.html'></template>
<style scoped src='./parkRunSplits.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import subNavBar from '../../components/subNavBar/subNavBar.vue'
import renderData from '../../mixins/renderData.js'
import activity from '../../components/activity/activity.vue'
import parkRunDict from '../../mixins/parkRunDict';

export default {
  name: 'parkRunSplits',
  components: {
    'nav-bar': navBar,
    'activity': activity,
    'subNavBar': subNavBar
  },
  mixins: [ renderData, parkRunDict ],
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
    kmTime: function(fullParkRun, km) {
      let segment = fullParkRun.segment_efforts.find(seg => seg.name === this.selectedParkRunSegs[km]);
      if (!segment) return; 
      return segment.moving_time;
    }
  },
  computed: {
    fullParkRuns: function () {
      if (!this.$store.state.fullParkRuns) return;
      return this.$store.state.fullParkRuns;
    },
    selectedParkRunSegs: function() {
      if (!this.$store.state.selectedParkRun) return;
      return this.$store.state.selectedParkRun.segDict;
    }
  }
}
</script>


