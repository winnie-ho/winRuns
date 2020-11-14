<template src='./hrZonesForm.html'></template>
<style scoped src='./hrZonesForm.css'></style>

<script>
import renderData from '../../mixins/renderData';

export default {
  name: 'hrZonesForm',
  components: {},
  mixins: [renderData],
  props: ['isEditing', 'HRZones'],
  data() {
    return {
      form: {
        z1: this.HRZones.z1,
        z2: this.HRZones.z2,
        z3: this.HRZones.z3,
        z4: this.HRZones.z4,
        z5: this.HRZones.z5,
      },
    };
  },
  mounted() {
  },
  methods: {
    updateHRZones() {
      this.$store.dispatch('updateHRZones', {
        ...this.form,
      });
      this.$emit('onCloseForm');
      setTimeout(this.refreshHRZones, 500);
    },
    cancelHRZones() {
      this.$emit('onCloseForm');
    },
  },
  computed: {
  },
};
</script>
