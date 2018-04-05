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
      }
    },
    methods: {
    },
    computed: {
      athlete: function() {
        if (!this.$store.state.athlete) return
        return this.$store.state.athlete
      }
    }
  }
</script>

