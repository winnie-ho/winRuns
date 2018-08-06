<template src='./swim.html'></template>
<style scoped src='./swim.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'


export default {
  name: 'swim',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
      pageTitle: 'SWIM'
    }
  },
  mounted () {
  },

  created () {
  },

  methods: {
    generateSwimFile: function() {
      console.log('GENERATE SWIM FILE', this.tcx)

    }
  },
  computed: {
    status: function() {

    }
  }
}
</script>
