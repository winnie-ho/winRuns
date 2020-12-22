<template src='./navMenu.html'></template>
<style scoped src='./navMenu.css'></style>

<script src>
import navBarBtn from '../navBarBtn/navBarBtn.vue';

export default {
  name: 'navMenu',
  components: {
    navBarBtn,
  },
  data() {
    return {
      expandBurger: false,
    };
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
    },
    showNav: {
      type: Boolean,
      required: false,
    },
    isElevatedProfile: {
      type: Boolean,
      required: true,
    },
    athlete: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleBurgerMenu() {
      this.expandBurger = !this.expandBurger;
      this.$emit('onBurgerMenu', false);
    },
  },
  computed: {
  },
};
</script>
