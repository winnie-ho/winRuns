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
    pageTitle: {
      type: String,
      required: false,
    },
    showNav: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    handleBurgerMenu() {
      this.expandBurger = !this.expandBurger;
      this.$emit('onBurgerMenu', false);
    },
  },
  computed: {
    athlete() {
      return this.$store.state.athlete;
    },
    onAuthPage() {
      return this.pageTitle === 'Auth';
    },
    burgerMenuHeightStyleInstruction() {
      return `--burgerMenuHeightStyle: ${window.innerHeight}px`;
    },
  },
};
</script>
