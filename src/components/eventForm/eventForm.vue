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
        category: this.event.category,
        description: this.event.description,
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
      const { date } = this.form;
      if (!date) return;
      this.$store.dispatch("createEvent", {
        ...this.form
      });
      this.$emit("onCloseForm");
    },
    updateEvent() {
      const { date } = this.form;
      if (!date) return;
      this.$store.dispatch("updateEvent", {
        ...this.form
      });
      this.$emit("onCloseForm");
    }
  },
  computed: {}
};
</script>
