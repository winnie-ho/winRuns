<template src="./monthStatBar.html"></template>
<style scoped src='./monthStatbar.css'></style>

<script src>
import renderData from "../../mixins/renderData.js";
import statTotal from "../statTotal/statTotal.vue";
import triStatsSummary from "../triStatsSummary/triStatsSummary.vue";

export default {
  name: "monthStatBar",
  mixins: [renderData],
  components: {
    statTotal,
    triStatsSummary
  },
  props: ["stats", "activities"],
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
    }
  },
  computed: {}
};
</script>

