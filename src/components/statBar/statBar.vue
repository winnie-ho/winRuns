<template src="./statBar.html"></template>
<style scoped src='./statbar.css'></style>

<script src>
import renderData from "../../mixins/renderData.js";
import statTotal from "../statTotal/statTotal.vue";

export default {
  name: "statBar",
  components: {
    statTotal
  },
  props: ["stats", "title"],
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchStats");
  },
  methods: {
    statType(activityType) {
      switch (activityType) {
        case "run":
          return this.stats.run;
          break;
        case "ride":
          return this.stats.ride;
          break;
        case "swim":
          return this.stats.swim;
          break;
      }
    }
  },
  computed: {}
};
</script>

