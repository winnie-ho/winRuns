<template src='./kmSplits.html'></template>
<style scoped src='./kmSplits.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import toggleSwitch from '../../components/toggleSwitch/toggleSwitch.vue'
import renderData from '../../mixins/renderData.js'
import changePage from '../../mixins/changePage';

export default {
  name: 'kmSplits',
  components: {
    'nav-bar': navBar,
    'toggleSwitch': toggleSwitch
  },
  mixins: [ renderData, changePage ],
  data () {
    return {
      pageTitle: 'KM SPLITS',
    }
  },
  mounted () {
    this.$store.dispatch('fetchFullKmSessions');
  },
  created() {
  },

  methods: {
    kmTime: function(kmSession, km) {
      const sessionZeroIndex = this.indexOfFirstRep(kmSession) - 2;
      const kmLap = kmSession.laps[sessionZeroIndex + (2 * km) - 1];
      if (!kmLap) return;
      return kmLap.moving_time;
    },
    indexOfFirstRep: function(kmSessionLaps) {
      return kmSessionLaps.laps.findIndex(lap => lap.elapsed_time === 75);
    },
    totalKmRepTime: function(kmSession) {
      const sessionZeroIndex = this.indexOfFirstRep(kmSession) - 2;
      let timeCount = 0;
      for (let i = 1; i <= 5; i ++) {
        const lap = kmSession.laps[sessionZeroIndex + (2 * i) - 1]
        const lapTime = lap.elapsed_time;
        timeCount += lapTime;
      }
      return timeCount;
    }
  },
  computed: {
    kmSessions: function () {
      if (!this.$store.getters.kmSessions) return;
      return this.$store.getters.kmSessions;
    },
    dateOrderedFullKmSessions: function () {
      if (!this.$store.getters.dateOrderedFullKmSessions) return;
      return this.$store.getters.dateOrderedFullKmSessions;
    },
  }
}
</script>


