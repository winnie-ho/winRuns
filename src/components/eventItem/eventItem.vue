<template src="./eventItem.html"></template>
<style scoped src='./eventItem.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";

export default {
  name: "eventItem",
  components: {},
  mixins: [renderData, changePage],
  props: ["event"],
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
