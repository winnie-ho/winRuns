<template src="./eventItem.html"></template>
<style scoped src='./eventItem.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";
import moment from "moment";

export default {
  name: "eventItem",
  components: {},
  mixins: [renderData, changePage],
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
    },
    showEditButtons() {
      this.viewEditButtons = true;
    },
    editEvent(event) {
      this.$emit("onEditEvent", event);
    },
    deleteEvent(eventId) {
      this.$store.dispatch("deleteOrder", eventId);
      setTimeout(this.refreshEventList, 500);
    },
    async refreshEventList() {
      await this.$store.dispatch("fetchEvents");
      await this.$router.push("/events/");
    },
    daysUntilEvent(event) {
      return moment(event.date).toNow(true);
    }
  },
  computed: {}
};
</script>
