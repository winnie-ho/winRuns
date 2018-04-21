<template src='./auth.html'></template>
<style scoped src='./auth.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'

export default {
  name: 'auth',
  components: {
    'nav-bar': navBar,
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'LOGIN',
    }
  },
  mounted () {
    
    },

  created() {
    },

  methods: {
    
    },
  computed: {

  }
}
</script>


