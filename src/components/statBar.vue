<template>
  <div id='stat-bar'>
    <stat-total :stats='stats' title='Runs' unit=''></stat-total>
    <stat-total :stats='stats' title='Distance' unit='km'></stat-total>
    <stat-total :stats='stats' title='Time' unit='hours'></stat-total>
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
      stats: {}
    }
  },
  mounted () {
  },
  created () {
    this.$http.get('https://www.strava.com/api/v3/athletes/3752965/stats?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(function (data) {
      this.stats = data.body.ytd_run_totals
      console.log('DATA', this.stats)
    })
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
