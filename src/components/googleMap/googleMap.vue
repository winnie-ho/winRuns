<template src="./googleMap.html"></template>
<style scoped src='./googleMap.css'></style>

<script>
export default {
  name: "googleMap",
  components: {},
  props: ["activity"],
  data() {
    return {
      map: {}
    };
  },
  mounted() {
    const mapContainer = document.getElementById("googleMap");

    let options = {
      zoom: 13,
      center: new google.maps.LatLng({ lat: 0, lng: 0 })
    };

    this.map = new google.maps.Map(mapContainer, options);
  },
  created() {
    setTimeout(this.createActivityMap, 1000);
  },
  methods: {
    createActivityMap() {
      this.routeLine.setMap(this.map);
      this.map.setCenter(this.centreCoords);
    }
  },
  computed: {
    centreCoords() {
      return {
        lat: this.activity.start_latlng[0],
        lng: this.activity.start_latlng[1]
      };
    },
    routeLine() {
      const routeLine = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(
          this.activity.map.polyline
        ),
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      return routeLine;
    }
  }
};
</script>
