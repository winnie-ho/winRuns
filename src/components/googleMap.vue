<template>
  <div class='google-map' v-bind:id="mapName">
  </div>
</template>

<script>
export default {
  name: 'googleMap',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      mapName: this.name + "-map"
    }
  },
  created() {
  },
  mounted: function () {
    const mapContainer = document.getElementById(this.mapName)
    const options = {
      zoom: 13,
      center: new google.maps.LatLng(this.activity.start_latlng[0], this.activity.start_latlng[1])
    }
    const map = new google.maps.Map(mapContainer, options);

    const line = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(this.activity.map.polyline),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });

    line.setMap(null);
    line.setMap(map);
    // map.setCenter(); 
  },
  methods: {
  },
  computed: {
    activity: function () {
      return this.$store.state.activity;
    }
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
