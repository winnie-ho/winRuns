<template src="./activitySession.html"></template>
<style scoped src='./activitySession.css'></style>

<script src>
  import renderData from '../../mixins/renderData.js'

  export default {
    name: 'activitySession',
    mixins: [ renderData ],
    data () {
      return {
        
      }
    },
    props: ['createSession', 'sessionEfforts'],
    mounted() {
      console.log('OPEN CREATE SESSION', this.createSession, this.sessionEfforts);
    },
    methods: {
      saveSession: function() {
        console.log('SAVE SESSION');
        // Formulate array of lap indices for activity ID. Trigger save to Firebase
      },
      resetSession: function() {
        console.log('RESET SESSION')
        this.$emit('onResetSessionEfforts')
      }
    },
    computed: {
      activity: function() {
        if(!this.store.state.activity) return;
        return this.$store.state.activity;
      },
      laps: function() {
        if(!this.$store.state.activity.laps) return;
        return this.$store.state.activity.laps;
      },
      orderedSessionEfforts: function() {
        return this.sessionEfforts.sort((a, b) => a.lap_index - b.lap_index)
      }
    }
  }
</script>

