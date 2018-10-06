<template>
  <div id='stat-bar' class='col'>
    <div class='stat-bar__title'>2018 TOTALS</div>
    <div id='stat-bar__details' class='stat-bar row' v-on:click='expandStats()'>
      <stat-total type='run' v-bind:expandToggle='expandStat'></stat-total>
      <stat-total type='ride' v-bind:expandToggle='expandStat'></stat-total>
      <stat-total type='swim' v-bind:expandToggle='expandStat'></stat-total>
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
      expandStat: false
    }
  },
  created() {
    this.$store.dispatch("fetchStats")
  },
  methods: {
    expandStats: function() {
      this.expandStat = !this.expandStat;
      const element = document.getElementById("stat-bar__details");
      element.scrollTop = element.scrollHeight;
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .stat-bar {
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
  }

  .stat-bar__title{
    margin-top: 20px;
  }
</style>
