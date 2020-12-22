<template src='./cap.html'></template>
<style scoped src='./cap.css'></style>

<script src>
import navBarBtn from '../navBarBtn/navBarBtn.vue';
import navMenu from '../navMenu/navMenu.vue';
import navBar from '../navBar/navBar.vue';

export default {
  name: 'cap',
  components: {
    navBarBtn,
    navMenu,
    navBar,
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
    isElevatedProfile() {
      return this.athlete && this.athlete.id === 3752965;
    }
  },
};
</script>
