<template>
  <div v-bind:id='mapName'>
    <div id='map'></div>
  </div>
</template>

<script>
export default {
  name: 'googleMap',
  props: [ 'lat', 'lng', 'polyline'],
  components: {
  },
  data () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted() {
    const mapContainer = document.getElementById('map')
    let options = {
      zoom: 13,
      center: new google.maps.LatLng(this.center),
      disableDefaultUI: true
    }

    const map = new google.maps.Map(mapContainer, options)



    // line.setMap(null);
    this.line.setMap(map);
    // map.setCenter(); 
    // this.updateCenter()
  },
  methods: {
  },
  computed: {
    center: function () {
      if (!this.lat) {
        return { lat: 59, lng: -3 }

      }
      return { lat: this.lat, lng: this.lng }
    },
    line: function () {
      return new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(this.polyline),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });
    }
  }
}
</script>

<style scoped>
  #map {
    height: 300px;
    width: 100%;
  }
</style>
