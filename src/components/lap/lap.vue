<template src="./lap.html"></template>
<style scoped src='./lap.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'lap',
  props: ['lap', 'activity', 'lapMarkers', 'createSession', 'sessionEfforts'],
  mixins: [renderData],
  data () {
    return {
      selected: false,
    }
  },
  methods: {
    markLap: function () {
      this.selected = true;


      if (this.createSession){
        this.$emit('onSessionMarkLapChange', this.lap)
      }
      
      if (!this.createSession) {
        this.$emit('onMarkLapChange', this.lap)
      }
    },
    mergeLap: function(){
      console.log('MERGE LAP')
    }
  },
  computed: {
    isSelectedLap: function () {
      if (!this.createSession) {
        if (!this.lapMarkers) return;
        return !!this.lapMarkers.includes(this.lap.lap_index - 1) 
      }
      if (this.createSession) {
        if (!this.sessionEfforts) return;
        let result =  !!this.sessionEfforts.includes(this.lap) 
        return result
      }
    }
  }
}
</script>
