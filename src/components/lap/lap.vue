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
    }
  },
  computed: {
    isSelectedLap: function () {
      console.log('CREATE SESSION', this.createSession)
      if (!this.createSession) {
        if (!this.lapMarkers) return;
        return !!this.lapMarkers.includes(this.lap.lap_index - 1) 
      }
      if (this.createSession) {
        if (!this.sessionEfforts) return;
        let result =  !!this.sessionEfforts.includes(this.lap) 
        console.log('SESSION EFFORTS', this.sessionEfforts)
        console.log('RESULT', this.lap.lap_index, result)
        return result
      }
    }
  }
}
</script>
