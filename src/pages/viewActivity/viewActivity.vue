<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import cap from '../../components/cap/cap.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import googleMap from '../../components/googleMap/googleMap.vue';
import activityDock from '../../components/activityDock/activityDock.vue';

export default {
  name: 'viewActivity',
  components: {
    cap,
    googleMap,
    activityDock,
  },
  mixins: [renderData, changePage],
  data() {
    return {
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchKudos', to.params.id);
      vm.$store.dispatch('fetchPhotos', to.params.id);
      vm.$store.dispatch('fetchComments', to.params.id);
      vm.$store.dispatch('fetchActivity', to.params.id);
      vm.$store.dispatch('fetchActivityStream', to.params.id);
      next();
    });
  },
  beforeDestroy() {
    this.$store.dispatch('resetActivity');
  },
  methods: {
    timeInZone(zone) {
      if (this.activityStream == null) {
        return '-';
      }
      const higherLimit = this.HRZones[zone];
      const zoneNumber = zone.substring(1, 2);
      const lowerLimit = this.HRZones[`z${(parseInt(zoneNumber) - 1)}`];
      let insideZone = [];
      let timeInZoneCount = 0;

      for (let i = 0; i < this.activityStreamSize; i++) {
        const indexHR = this.activityStream.heartrate.data[i];
        const indexTime = this.activityStream.time.data[i];
        const indexMoving = this.activityStream.moving.data[i];
        if ((indexHR <= higherLimit && indexMoving) && (indexHR >= lowerLimit && indexMoving)) {
          insideZone.push(indexTime);
          const nextIndexHR = this.activityStream.heartrate.data[i + 1];
          const nextIndexMoving = this.activityStream.moving.data[i + 1];
          const nextIndexTime = this.activityStream.time.data[i + 1];
          if ((nextIndexHR > higherLimit && nextIndexMoving) || (nextIndexHR < lowerLimit && nextIndexMoving)) {
            if (insideZone.length === 1) {
              timeInZoneCount += (nextIndexTime - insideZone[0]);
            } else {
              timeInZoneCount += (insideZone[insideZone.length - 1] - insideZone[0]);
            }
            insideZone = [];
          }
        }
      }
      return timeInZoneCount;
    },
    percentTimeInZone(zone) {
      return `${(this.timeInZone(zone) / this.activity.moving_time * 100).toFixed(0)}%`;
    },
  },
  computed: {
    activity() {
      return this.$store.state.activity;
    },
    hasMapPolyline() {
      return this.$store.state.activity.map && this.$store.state.activity.map.summary_polyline;
    },
    activityStream() {
      return this.$store.state.activityStream ? this.$store.state.activityStream : null;
    },
    activityStreamSize() {
      return this.activityStream.time ? this.activityStream.time.original_size - 1 : null;
    },
    HRZones() {
      return this.$store.state.HRZones;
    },
  },
};
</script>
