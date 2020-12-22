<template src='./parkRunSplits.html'></template>
<style scoped src='./parkRunSplits.css'></style>

<script>
import cap from '../../components/cap/cap.vue';
import parkRunSubBar from '../../components/parkRunSubBar/parkRunSubBar.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';

export default {
  name: 'parkRunSplits',
  components: {
    cap,
    parkRunSubBar,
  },
  mixins: [renderData, changePage],
  data() {
    return {
      pageTitle: 'PARK RUN SPLITS',
      lapSplitMethod: true,
    };
  },
  methods: {
    kmTime(fullParkRun, km) {
      if (this.lapSplitMethod) {
        const kmLap = fullParkRun.laps[km - 1];
        return kmLap && kmLap.moving_time;
      }

      const segment = fullParkRun.segment_efforts.find(
        seg => seg.name === this.selectedParkRunSegs[km],
      );
      return segment && segment.moving_time;
    },
    setSplitMethod(method) {
      this.lapSplitMethod = method;
    },
  },
  computed: {
    dateOrderedFullParkRuns() {
      return this.$store.getters.dateOrderedFullParkRuns;
    },
    selectedParkRunSegs() {
      return this.$store.state.selectedParkRun.segDict;
    },
  },
};
</script>
