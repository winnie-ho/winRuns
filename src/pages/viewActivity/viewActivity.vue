<template src='./viewActivity.html'></template>
<style scoped src='./viewActivity.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';
import googleMap from '../../components/googleMap/googleMap.vue';
import activityDock from '../../components/activityDock/activityDock.vue';

export default {
  name: 'viewActivity',
  components: {
    navBar,
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
      next();
    });
  },
  beforeDestroy() {
    this.$store.dispatch('resetActivity');
  },
  methods: {
  },
  computed: {
    activity() {
      return this.$store.state.activity;
    },
    hasMapPolyline() {
      return this.$store.state.activity.map && this.$store.state.activity.map.summary_polyline;
    },
  },
};
</script>
