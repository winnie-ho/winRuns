<template src='./events.html'></template>
<style scoped src='./events.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import searchBar from "../../components/searchBar/searchBar.vue";
import filterBar from "../../components/filterBar/filterBar.vue";
import eventItem from "../../components/eventItem/eventItem.vue";
import eventForm from "../../components/eventForm/eventForm.vue";
import moment from "moment";

export default {
  name: "events",
  components: {
    navBar,
    searchBar,
    filterBar,
    eventItem,
    eventForm
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: "EVENTS",
      showForm: false,
      event: {},
      isEditing: false
    };
  },
  mounted() {
    this.$store.dispatch("fetchEvents");
  },
  methods: {
    addEvent() {
      this.showForm = !this.showForm;
      this.isEditing = false;
    },
    editEvent(event) {
      this.event = event;
      this.showForm = true;
      this.isEditing = true;
    },
    closeForm() {
      this.showForm = false;
    }
  },
  computed: {
    events() {
      if (!this.$store.state.events) return;
      return this.$store.state.events;
    },
    upComingEvents() {
      if (!this.events) return;
      return this.events
        .filter(event => {
          return new Date(event.date) >= new Date();
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    pastEvents() {
      return this.events
        .filter(event => {
          return new Date(event.date) < new Date();
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    numberOfRaces() {
      return this.$store.state.events.reduce((total, event) => {
        return total + (event.category === true);
      }, 0);
    },
    timeToNextEvent() {
      if (!this.upComingEvents || !this.upComingEvents.length) return;
      const msTimeToNextEvent =
        new Date(this.upComingEvents[0].date) - new Date();
      return moment.duration(msTimeToNextEvent).humanize();
    },
    nextEvent() {
      if (!this.upComingEvents.length) return;
      return this.upComingEvents[0].title;
    }
  }
};
</script>


