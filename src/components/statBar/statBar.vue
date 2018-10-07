<template src="./statBar.html"></template>
<style scoped src='./statbar.css'></style>

<script src>
import renderData from '../../mixins/renderData.js'
import statTotal from "../statTotal/statTotal.vue";

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

