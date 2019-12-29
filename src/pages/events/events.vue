<template src='./events.html'></template>
<style scoped src='./events.css'></style>

<script>
import moment from 'moment';
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import searchBar from '../../components/searchBar/searchBar.vue';
import filterBar from '../../components/filterBar/filterBar.vue';
import eventItem from '../../components/eventItem/eventItem.vue';
import eventForm from '../../components/eventForm/eventForm.vue';

export default {
  name: 'events',
  components: {
    navBar,
    searchBar,
    filterBar,
    eventItem,
    eventForm,
  },
  mixins: [renderData],
  data() {
    return {
      pageTitle: 'EVENTS',
      showForm: false,
      event: {},
      isEditing: false,
    };
  },
  mounted() {
    this.$store.dispatch('fetchEvents');
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
    },
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    upComingEvents() {
      return this.events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    pastEvents() {
      return this.events
        .filter(event => new Date(event.date) < new Date())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    numberOfRaces() {
      return this.$store.state.events.reduce((total, race) => total + (race.category === true), 0);
    },
    timeToNextEvent() {
      const msTimeToNextEvent = new Date(this.upComingEvents[0].date) - new Date();
      return this.upComingEvents
      && this.upComingEvents.length && moment.duration(msTimeToNextEvent).humanize();
    },
    nextEvent() {
      return this.upComintEvents.length && this.upComingEvents[0].title;
    },
  },
};
</script>
