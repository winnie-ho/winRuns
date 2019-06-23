<template src="./weather.html"></template>
<style scoped src='./weather.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "weather",
  props: [],
  data() {
    return {};
  },
  mixins: [renderData],
  created() {
    this.$store.dispatch("fetchWeatherNow");
  },
  computed: {
    weather() {
      if (!this.$store.state.weatherNow.main) return;
      return this.$store.state.weatherNow.main;
    },
    temp() {
      return this.weather && this.$store.state.weatherNow.main.temp;
    },
    description() {
      return this.weather && this.$store.state.weatherNow.weather[0].main;
    },
    wind() {
      return this.weather && this.$store.state.weatherNow.wind.speed;
    },
    locationName() {
      return this.weather && this.$store.state.weatherNow.name
        ? this.$store.state.weatherNow.name
        : "unknown location";
    }
  }
};
</script>
