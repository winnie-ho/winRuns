<template src='./maf.html'></template>
<style scoped src='./maf.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import dateRangeSelector from '../../components/dateRangeSelector/dateRangeSelector.vue';
import hrZonesForm from '../../components/hrZonesForm/hrZonesForm.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';

export default {
  name: 'maf',
  components: {
    navBar,
    dateRangeSelector,
    hrZonesForm,
  },
  mixins: [renderData, changePage],
  data() {
    return {
      pageTitle: 'MAF',
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
