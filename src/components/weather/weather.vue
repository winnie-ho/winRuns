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
    temp() {
      if (!this.$store.state.weatherNow.main) return;
      return this.$store.state.weatherNow.main.temp;
    },
    description() {
      if (!this.$store.state.weatherNow.weather) return;
      return this.$store.state.weatherNow.weather[0].main;
    },
    wind() {
      if (!this.$store.state.weatherNow.weather) return;
      return (
        (2.2369362920544 * this.$store.state.weatherNow.wind.speed).toFixed(0) +
        "mph"
      );
    },
    locationName() {
      if (!this.$store.state.weatherNow.weather) return;
      return this.$store.state.weatherNow.name;
    }
  }
};
</script>
