<template src="./eventForm.html"></template>
<style scoped src='./eventForm.css'></style>

<script>
import renderData from "../../mixins/renderData.js";
import changePage from "../../mixins/changePage.js";

export default {
  name: "eventForm",
  components: {},
  mixins: [renderData],
  props: [],
  data() {
    return {
      form: {
        title: "",
        type: "",
        date: "",
        time: "",
        race: false,
        description: ""
      }
    };
  },
  methods: {
    createEvent() {
      const { date, time } = this.form;

      if (!date) return;
      this.$store.dispatch("createEvent", {
        ...this.form,
        start_date: date
          .toISOString()
          .substr(0, 11)
          .concat(time.toISOString().substr(11, 20))
      });
    }
  },
  computed: {}
};
</script>
