<template>
  <div class='google-map' v-bind:id="mapName">
  </div>
</template>

<script>
export default {
  name: 'googleMap',
  props: [ 'name' ],
  components: {
  },
  data () {
    return {
      mapName: this.name + "-map",
    }
  },
  created() {
  },
  mounted: function () {
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(51.501527,-0.1921837)
    }
    const map = new google.maps.Map(element, options);
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
  .google-map {
    width: 100vw;
    height: 94vh;
    margin: 0 auto;
    background: gray;
  }
</style>
