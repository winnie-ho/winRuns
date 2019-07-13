<template src="./eventForm.html"></template>
<style scoped src='./eventForm.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";

export default {
  name: "eventForm",
  components: {},
  mixins: [renderData],
  props: ["event", "isEditing"],
  data() {
    return {
      form: {
        title: this.event.title,
        type: this.event.type,
        date: this.event.date,
        time: this.event.time,
        race: this.event.race,
        description: this.event.description
      }
    };
  },
  watch: {
    event: function(event) {
      this.form = event;
    }
  },
  methods: {
    createEvent() {
      const { date, time } = this.form;
      if (!date) return;
      this.$store.dispatch("createEvent", {
        ...this.form,
        start_date: this.getStartDate(date, time)
      });
      this.$emit("onCloseForm");
    },
    updateEvent() {
      const { date, time } = this.form;
      if (!date) return;
      this.$store.dispatch("updateEvent", {
        ...this.form,
        start_date: this.getStartDate(date, time)
      });
      this.$emit("onCloseForm");
    },
    getStartDate(date, time) {
      return date
        .toISOString()
        .substr(0, 11)
        .concat(time.toISOString().substr(11, 20));
    }
  },
  computed: {}
};
</script>
