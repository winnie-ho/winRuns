<template src='./eventForm.html'></template>
<style scoped src='./eventForm.css'></style>

<script>
import renderData from '../../mixins/renderData';
import refresh from '../../mixins/refresh';

export default {
  name: 'eventForm',
  components: {},
  mixins: [renderData, refresh],
  props: ['event', 'isEditing'],
  data() {
    return {
      form: {
        title: this.isEditing ? this.event.title : '',
        type: this.isEditing ? this.event.type : '',
        date: this.isEditing ? this.event.date : '',
        time: this.isEditing ? this.event.time : '',
        category: this.isEditing ? this.event.category : '',
        description: this.isEditing ? this.event.description : '',
      },
    };
  },
  watch: {
    event(event) {
      this.form = event;
    },
  },
  methods: {
    createEvent() {
      const { date, time } = this.form;
      if (!date && !time) return;
      this.$store.dispatch('createEvent', {
        ...this.form,
        date: this.prepareDateTime(date, time),
      });
      this.$emit('onCloseForm');
      setTimeout(this.refreshEvents, 500);
    },
    updateEvent() {
      const { date, time } = this.form;
      if (!date && !time) return;
      this.$store.dispatch('updateEvent', {
        ...this.form,
        date: this.prepareDateTime(date, time),
      });
      this.$emit('onCloseForm');
      setTimeout(this.refreshEvents, 500);
    },
    prepareDateTime(date, time) {
      const dateBase = new Date(date);
      dateBase.setHours(time.slice(0, 2));
      dateBase.setMinutes(time.slice(3, 5));
      dateBase.setSeconds('00');
      return dateBase;
    },
  },
};
</script>
