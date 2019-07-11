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
  methods: {
    deleteEvent(eventId) {
      console.log("deleteEvent", eventId);
      this.$store.dispatch("deleteOrder", eventId);
      setTimeout(this.refreshEventList, 500);
    },
    async refreshEventList() {
      await this.$store.dispatch("fetchEvents");
      await this.$router.push("/events/");
    }
  },
  computed: {}
};
</script>
