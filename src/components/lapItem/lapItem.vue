<template src="./lapItem.html"></template>
<style scoped src='./lapItem.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "lapItem",
  props: ["lap", "activity", "lapMarkers", "createSession", "sessionEfforts"],
  mixins: [renderData],
  data() {
    return {
      selected: false,
      merged: false
    };
  },
  methods: {
    markLap() {
      this.selected = true;

      if (this.createSession) {
        this.$emit("onSessionMarkLapChange", this.lap);
      }

      if (!this.createSession) {
        this.$emit("onMarkLapChange", this.lap);
      }
    },
    mergeLap() {
      this.$emit("onSessionMarkLapMerge", this.lap);
      this.merged = !this.merged;
    }
  },
  computed: {
    isSelectedLap() {
      if (!this.createSession) {
        if (!this.lapMarkers) return;
        return !!this.lapMarkers.includes(this.lap.lap_index - 1);
      }
      if (this.createSession) {
        if (!this.sessionEfforts) return;
        return !!this.sessionEfforts.includes(this.lap);
      }
    },
    isMergeable() {
      let isSelectedLap = this.sessionEfforts.find(
        effort => effort.lap_index === this.lap.lap_index
      );
      if (isSelectedLap) {
        let result = this.sessionEfforts
          .map(index => index.lap_index)
          .indexOf(this.lap.lap_index - 1);
        return result !== -1;
      }
    }
  }
};
</script>
