<template src='./events.html'></template>
<style scoped src='./events.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import searchBar from "../../components/searchBar/searchBar.vue";
import filterBar from "../../components/filterBar/filterBar.vue";
import eventItem from "../../components/eventItem/eventItem.vue";
import eventForm from "../../components/eventForm/eventForm.vue";

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
      showEdit: false
    };
  },
  mounted() {
    this.$store.dispatch("fetchEvents");
  },
  methods: {
    addEvent() {
      console.log("ADD");
      this.showForm = !this.showForm;
    },
    editEvent() {
      console.log("EDIT");
      this.showEdit = !this.showEdit;
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


