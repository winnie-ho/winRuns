<template src='./hrZones.html'></template>
<style scoped src='./hrZones.css'></style>

<script>
import hrZonesForm from '../hrZonesForm/hrZonesForm.vue';

export default {
  name: 'hrZones',
  components: {
    hrZonesForm,
  },
  props: [],
  data() {
    return {
      showHRZonesForm: false,
    };
  },
  mounted() {
  },
  methods: {
    editHRZones() {
      this.showHRZonesForm = !this.showHRZonesForm;
    },
    closeHRZonesForm() {
      this.showHRZonesForm = false;
    },
  },
  computed: {
    HRZones() {
      return this.$store.state.HRZones;
    },
  },
};
</script>
