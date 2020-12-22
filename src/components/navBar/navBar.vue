<template src='./navBar.html'></template>
<style scoped src='./navBar.css'></style>

<script src>
import navBarBtn from '../navBarBtn/navBarBtn.vue';

export default {
  name: 'navBar',
  components: {
    navBarBtn,
  },
  data() {
    return {
      expandBurger: false,
    };
  },
  props: {
    showNav: {
      type: Boolean,
      required: false,
    },
    isElevatedProfile: {
      type: Boolean,
      required: false,
    },
    athlete: {
      type: Object,
      required: false,
    }
  },
  methods: {
  },
  computed: {
  },
};
</script>
