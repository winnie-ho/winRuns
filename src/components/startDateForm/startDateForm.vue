<template src='./startDateForm.html'></template>
<style scoped src='./startDateForm.css'></style>

<script>
import renderData from '../../mixins/renderData';
import refresh from '../../mixins/refresh';

export default {
  name: 'startDateForm',
  components: {},
  mixins: [renderData, refresh],
  props: ['storedFixedStartDate'],
  data() {
    return {
      form: {
        fixedStartDate: this.storedFixedStartDate,
      },
    };
  },
  mounted() {
  },
  methods: {
    updateFixedStartDate() {
      const payload = {
        fixedStartDate: this.form.fixedStartDate,
      };
      this.$store.dispatch('updateFixedStartDate', payload);
      this.$emit('onCloseForm');
      this.$emit('onFixedStartDateUpdate', this.form.fixedStartDate);
      setTimeout(this.refreshFixedStartDate, 500);
    },
    cancelEditFixedStartDate() {
      this.$emit('onCloseForm');
    },
  },
  computed: {
  },
};
</script>
