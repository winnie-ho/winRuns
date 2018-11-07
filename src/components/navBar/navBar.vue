<template src="./navBar.html"></template>
<style scoped src='./navBar.css'></style>

<script src>
  import navBarBtn from '../navBarBtn/navBarBtn.vue'
  export default {
    name: 'navBar',
    components: {
      "nav-bar-btn": navBarBtn
    },
    data () {
      return {
        expandBurger: false
      }
    },
    props: {
      pageTitle: {
        type: String,
        required: true
      },
      showNav: {
        type: Boolean,
        required: false
      }
    },
    mounted(){
    },
    methods: {
    },
    computed: {
      athlete: function() {
        if (!this.$store.state.athlete) return;
        return this.$store.state.athlete;
      }
    }
  }
</script>

