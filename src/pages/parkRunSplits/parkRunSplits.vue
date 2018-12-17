<template src='./parkRunSplits.html'></template>
<style scoped src='./parkRunSplits.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import parkRunSubBar from '../../components/parkRunSubBar/parkRunSubBar.vue'
import toggleSwitch from '../../components/toggleSwitch/toggleSwitch.vue'
import renderData from '../../mixins/renderData.js'
import parkRunDict from '../../mixins/parkRunDict';

export default {
  name: 'parkRunSplits',
  components: {
    'nav-bar': navBar,
    'parkRunSubBar': parkRunSubBar,
    'toggleSwitch': toggleSwitch
  },
  mixins: [ renderData, parkRunDict ],
  data () {
    return {
      pageTitle: 'PARK RUN SPLITS',
      lapSplitMethod: true
    }
  },
  mounted () {
  },
  created() {
  },

  methods: {
    kmTime: function(fullParkRun, km) {
      if (this.lapSplitMethod) {
        const kmLap = fullParkRun.laps[km - 1 ];
        if (!kmLap) return;
        return kmLap.moving_time;
      }

      const segment = fullParkRun.segment_efforts.find(seg => seg.name === this.selectedParkRunSegs[km]);
      if (!segment) return; 
      return segment.moving_time;
    },
    setSplitMethod(method){
      this.lapSplitMethod = method;
    }
  },
  computed: {
    dateOrderedFullParkRuns: function () {
      if (!this.$store.getters.dateOrderedFullParkRuns) return;
      return this.$store.getters.dateOrderedFullParkRuns;
    },
    selectedParkRunSegs: function() {
      if (!this.$store.state.selectedParkRun) return;
      return this.$store.state.selectedParkRun.segDict;
    }
  }
}
</script>


