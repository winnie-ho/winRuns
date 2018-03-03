<template>
  <div id='stat-bar'>
    <stat-total type='run'></stat-total>
    <stat-total type='ride'></stat-total>
    <stat-total type='swim'></stat-total>
  </div>
</template>

<script>
import statTotal from '../components/statTotal.vue'

export default {
  name: 'statBar',
  components: {
    'stat-total': statTotal
  },
  data () {
    return {
    }
  },
  created() {
    this.$store.dispatch("fetchStats")
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
  #stat-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
</style>
