<template src='./googleMap.html'></template>
<style scoped src='./googleMap.css'></style>

<script>
/* eslint-disable no-undef */

import { styledMap } from './styleMap';

export default {
  name: 'googleMap',
  components: {},
  props: ['activity', 'hasMapPolyline'],
  data() {
    return {
      map: {},
    };
  },
  mounted() {
    const mapContainer = document.getElementById('googleMap');

    const options = {
      zoom: 13,
      center: new google.maps.LatLng({ lat: 0, lng: 0 }),
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map'],
      },
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(mapContainer, options);

    const styledMapType = new google.maps.StyledMapType(styledMap, {
      name: 'Styled Map',
    });
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
  },
  created() {
    setTimeout(this.createActivityMap, 1000);
  },
  methods: {
    createActivityMap() {
      if (!this.hasMapPolyline) return;
      this.routeLine.setMap(this.map);
      this.map.setCenter(this.centreCoords);

      this.zoomToRouteLine(this.routeLine);
    },
    zoomToRouteLine(routeLine) {
      const bounds = new google.maps.LatLngBounds();
      const points = routeLine.getPath().getArray();
      for (let i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      this.map.fitBounds(bounds);
    },
  },
  computed: {
    centreCoords() {
      return {
        lat: this.activity.start_latlng[0],
        lng: this.activity.start_latlng[1],
      };
    },
    routeLine() {
      const routeLine = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(
          this.activity.map.polyline,
        ),
        geodesic: true,
        strokeColor: '#FF595E',
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      return routeLine;
    },
  },
};
</script>
