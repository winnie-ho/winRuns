<template>
  <div id='runclub'>
    <nav-bar v-bind:pageTitle='pageTitle'></nav-bar>
    RUN CLUB PAGE
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'

export default {
  name: 'runclub',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
      pageTitle: 'RUN CLUB'
    }
  },
  mounted () {
  },

  created () {
  },

  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
