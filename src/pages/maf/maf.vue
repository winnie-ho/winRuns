<template src='./maf.html'></template>
<style scoped src='./maf.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import dateRangeSelector from '../../components/dateRangeSelector/dateRangeSelector.vue';
import hrZones from '../../components/hrZones/hrZones.vue';
import renderData from '../../mixins/renderData';
import changePage from '../../mixins/changePage';

export default {
  name: 'maf',
  components: {
    navBar,
    dateRangeSelector,
    hrZones,
  },
  mixins: [renderData, changePage],
  data() {
    return {
      pageTitle: 'MAF',
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  },
};
</script>
