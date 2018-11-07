<template src="./navBar.html"></template>
<style scoped src='./navBar.css'></style>

<script src>
  export default {
    name: 'navBar',
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
      pageSelected(pages){
        return pages.find(page => page === this.$route.path);
      }
    },
    computed: {
      athlete: function() {
        if (!this.$store.state.athlete) return;
        return this.$store.state.athlete;
      }
    }
  }
</script>

