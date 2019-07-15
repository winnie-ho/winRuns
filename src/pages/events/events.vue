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
      return this.$store.state.events;
    },
    numberOfRaces() {
      return this.$store.state.events.reduce((total, event) => {
        return total + (event.category === true);
      }, 0)
    }
  }
};
</script>


