<template src="./weather.html"></template>
<style scoped src='./weather.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'weather',
  props: [],
  data () {
    return {
    }
  },
  mixins: [ renderData ],
  methods: {
   
  },
  computed: {
    temp: function () {
      if (!this.$store.state.weatherNow.main) return;
      return this.$store.state.weatherNow.main.temp;
    },
    description: function () {
      if (!this.$store.state.weatherNow.weather) return;
      return this.$store.state.weatherNow.weather[0].main;
    },
    wind: function () {
      if (!this.$store.state.weatherNow.weather) return;
      return (2.2369362920544 * this.$store.state.weatherNow.wind.speed).toFixed(0) + "mph"
    }
  }
}
</script>
