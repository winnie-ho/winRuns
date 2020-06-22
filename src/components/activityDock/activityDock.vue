<template src='./activityDock.html'></template>
<style scoped src='./activityDock.css'></style>

<script>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';
import lapItem from '../lapItem/lapItem.vue';


export default {
  name: 'activityDock',
  components: {
    lapItem,
  },
  mixins: [renderData, appData],
  props: ['activity'],
  data() {
    return {
      toggleLaps: false,
      toggleKudos: false,
      toggleComments: false,
    };
  },
  methods: {
    setDockItem(item) {
      switch (item) {
        case 'laps':
          this.toggleLaps = !this.toggleLaps;
          this.toggleKudos = false;
          this.toggleComments = false;
          break;
        case 'kudos':
          this.toggleLaps = false;
          this.toggleKudos = !this.toggleKudos;
          this.toggleComments = false;
          break;
        case 'comments':
          this.toggleLaps = false;
          this.toggleKudos = false;
          this.toggleComments = !this.toggleComments;
          break;
        default:
          this.toggleLaps = false;
          this.toggleKudos = false;
          this.toggleComments = false;
      }
    },
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    kudos() {
      return this.$store.state.kudos;
    },
    laps() {
      return this.$store.state.activity.laps;
    },
    photos() {
      return this.$store.state.photos;
    },
    lapsCount() {
      return (
        this.$store.state.activity.laps && this.$store.state.activity.laps.length
      );
    },
  },
};
</script>
