<template src='./events.html'></template>
<style scoped src='./events.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import searchBar from "../../components/searchBar/searchBar.vue";
import filterBar from "../../components/filterBar/filterBar.vue";
import eventItem from "../../components/eventItem/eventItem.vue";

export default {
  name: "events",
  components: {
    navBar,
    searchBar,
    filterBar,
    eventItem
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: "EVENTS"
    };
  },
  mounted() {
    this.$store.dispatch("fetchEvents");
  },
  methods: {
    addEvent() {
      console.log("ADD EVENT");
    }
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    filteredEvents() {
      if (!this.events && !this.wordToSearch) return;
      const filteredEventsByWordSearch = this.events.filter(event => {
        return event.title
          .toLowerCase()
          .includes(this.wordToSearch.toLowerCase());
      });
      return this.filterByEvents(filteredEventsByWordSearch);
    }
  }
};
</script>


