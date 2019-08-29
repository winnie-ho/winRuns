<template src="./monthStatBar.html"></template>
<style scoped src='./monthStatbar.css'></style>

<script src>
import renderData from "../../mixins/renderData.js";
import statTotal from "../statTotal/statTotal.vue";

export default {
  name: "monthStatBar",
  components: {
    statTotal
  },
  props: ["stats", "title"],
  data() {
    return {};
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
    },
    stats() {}
  },
  computed: {}
};
</script>

