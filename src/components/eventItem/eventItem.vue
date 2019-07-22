<template src="./eventItem.html"></template>
<style scoped src='./eventItem.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";
import refresh from "../../mixins/refresh.js";
import moment from "moment";

export default {
  name: "eventItem",
  components: {},
  mixins: [renderData, changePage, refresh],
  props: ["event", "pastEvent"],
  data() {
    return {
      viewEvent: false,
      viewEditButtons: false
    };
  },
  methods: {
    hideEditButtons() {
      this.viewEditButtons = false;
      this.viewEvent = true;
    },
    showEditButtons() {
      this.viewEditButtons = true;
    },
    editEvent(event) {
      this.$emit("onEditEvent", event);
    },
    deleteEvent(eventId) {
      this.$store.dispatch("deleteOrder", eventId);
      setTimeout(this.refreshEvents, 500);
    },
    daysUntilEvent(event) {
      return moment(event.date).toNow(true);
    }
  },
  computed: {}
};
</script>
