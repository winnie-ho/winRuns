<template src='./hrZonesForm.html'></template>
<style scoped src='./hrZonesForm.css'></style>

<script>
import renderData from '../../mixins/renderData';
import refresh from '../../mixins/refresh';

export default {
  name: 'hrZonesForm',
  components: {},
  mixins: [renderData, refresh],
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
      const payload = {
        z1: parseInt(this.form.z1),
        z2: parseInt(this.form.z2),
        z3: parseInt(this.form.z3),
        z4: parseInt(this.form.z4),
        z5: parseInt(this.form.z5),
      };
      this.$store.dispatch('updateHRZones', payload);
      this.$emit('onCloseForm');
      setTimeout(this.refreshHRZones, 100);
    },
    cancelHRZones() {
      this.$emit('onCloseForm');
    },
  },
  computed: {
  },
};
</script>
