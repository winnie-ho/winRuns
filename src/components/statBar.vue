<template>
  <div id='stat-bar' class='row'>
    <div class='stat-bar__title'>THIS YEAR</div>
    <div class='stat-bar'>
      <stat-total type='run'></stat-total>
      <stat-total type='ride'></stat-total>
      <stat-total type='swim'></stat-total>
    </div>
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
    position: absolute;
    bottom: 0px;
    width: calc(100% - 10px);
    justify-content: flex-end;
  }

  .stat-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
  }

  .stat-bar__title {
    position: absolute;
    bottom: 0px;
    padding: 12px;
    left: 0px;
    width: 70px;
  }
</style>
