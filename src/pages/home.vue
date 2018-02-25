<template>
  <div id='home'>
    <nav-bar></nav-bar>
    <div id='year-totals'>
      <stat-total></stat-total>
      <stat-total></stat-total>
      <stat-total></stat-total>
    </div>
  </div>
</template>


<script>
import navBar from '../components/navBar.vue'
import statTotal from '../components/statTotal.vue'

export default {
  name: 'home',
  components: {
    'nav-bar': navBar,
    'stat-total': statTotal
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
