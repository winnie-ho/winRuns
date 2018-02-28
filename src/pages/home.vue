<template>
  <div id='home'>
    <nav-bar></nav-bar>
    <div id='year-totals'>
      <stat-bar></stat-bar>
    </div>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import statBar from '../components/statBar.vue'

export default {
  name: 'home',
  components: {
    'nav-bar': navBar,
    'stat-bar': statBar
  },
  data () {
    return {
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
  #year-totals{
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
</style>
