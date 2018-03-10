<template>
  <div class='google-map' v-bind:id='mapName'></div>
</template>

<script>
export default {
  name: 'googleMap',
  props: [ 'name', 'mapActivity' ],
  components: {
  },
  data () {
    return {
      mapName: this.name + "-map"
    }
  },
  mounted() {
    console.log("MAP ACT", this.mapActivity)
    if (!this.mapActivity) return
    this.renderMap()
  },
  methods: {
    renderMap: function() {
      const mapContainer = document.getElementById(this.mapName)
      const coords = this.mapActivity.start_latlng
      const options = {
        zoom: 13,
        center: new google.maps.LatLng(coords[0], coords[1])
      }
      const map = new google.maps.Map(mapContainer, options)

      const line = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(this.mapActivity.map.polyline),
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
  computed: {
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
