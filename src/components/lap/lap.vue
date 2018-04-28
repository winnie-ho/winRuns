<template src="./lap.html"></template>
<style scoped src='./lap.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'lap',
  props: ['lap', 'activity', 'lapMarkers'],
  mixins: [renderData],
  data () {
    return {
      selected: false,
    }
  },
  methods: {
    markLap: function () {
      this.selected = true;
      this.$emit('onMarkLapChange', this.lap)
    }
  },
  computed: {
    isSelectedLap: function () {
      if (!this.lapMarkers) return;
      return !!this.lapMarkers.includes(this.lap.lap_index - 1)
    }
  }
}
</script>
