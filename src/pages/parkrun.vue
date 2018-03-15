<template>
  <div id='parkrun'>
    <nav-bar></nav-bar>
      <select 
        id="park-run-select" 
        v-model='selectedParkRun'
        v-on:change='setParkRunLocation()'
        placeholder='select Park Run'>
        <option v-for='parkRun in parkRunDict' v-bind:key='parkRun.index' v-bind:value='parkRun'>{{ parkRun.name }}</option>
      </select>

      <div v-for='parkRun in parkRuns' v-bind:key='parkRun.index'>
        {{ parkRun.name }}
      </div>
      
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import parkRunDict from '../mixins/parkRunDict.js'

export default {
  name: 'parkrun',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
      selectedParkRun: {}
    }
  },
  mixins: [ parkRunDict ],
  mounted () {
  },

  created () {
  },

  methods: {
    setParkRunLocation: function() {
      this.$store.dispatch('setSelectedParkRun', this.selectedParkRun)
    }
  },
  computed: {
    parkRuns: function () {
      return this.$store.getters.parkRuns
    }
  }
}
</script>

<style scoped>

</style>
