<template>
  <div class='google-map' v-bind:id='mapName'>
    <!-- <gmap-map
      v-bind:center = 'center'
      v-bind:zoom="12"
      style="height: 102.5vw; width: 100vw">
    </gmap-map> -->

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
      center: new google.maps.LatLng(this.center)
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
  gmap-map {
    margin: 0 auto;
    color: yellowgreen;
  }

  #map {
    height: 65vh;
    width: 100vw;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  #test {
    position: absolute;
    z-index: 200000;
    color: red;
    border: blue dashed 1px;
    height: 200px;
    width: 200px;
  }

</style>
