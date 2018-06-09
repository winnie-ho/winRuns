<template src="./activitySession.html"></template>
<style scoped src='./activitySession.css'></style>

<script src>
  import renderData from '../../mixins/renderData.js'

  export default {
    name: 'activitySession',
    mixins: [ renderData ],
    data () {
      return {
        sessionSaved: false
      }
    },
    props: ['createSession', 'sessionEfforts'],
    methods: {
      saveSession: function() {
        // this.$http.post('https://win-runs.firebaseio.com/sessions.json', this.sessionEfforts).then(function(data){
        //   this.sessionSaved = true;
        //   console.log('DATA', data, this.sessionSaved);
        // })

        // Only updating the description to hold the session details.
        let updatedActivity = {
          "commute": this.activity.commute,
          "trainer": this.activity.trainer,
          "description": this.renderStravaSession,
          "name": this.activity.name,
          "type": this.activity.type,
          "private": this.activity.private,
          "gear_id": this.activity.gear_id
        }
        let actionParameters = [this.activity.id, updatedActivity]
        console.log('UPDATED ACTIVITY', updatedActivity.description)
        this.$store.dispatch('updateStravaActivity', actionParameters)

        this.sessionSaved = true;
      },
      resetSession: function() {
        this.sessionSaved = false;
        this.$emit('onResetSessionEfforts')
      },
      closeSession: function() {
        this.$emit('onCloseSession')
      }
    },
    computed: {
      activity: function() {
        if(!this.$store.state.activity) return;
        return this.$store.state.activity;
      },
      laps: function() {
        if(!this.$store.state.activity.laps) return;
        return this.$store.state.activity.laps;
      },
      orderedSessionEfforts: function() {
        return this.sessionEfforts.sort((a, b) => a.lap_index - b.lap_index)
      },
      sessions: function() {
        if(!this.$store.state.sessions) return;
        return this.$store.state.sessions;
      },
      sessionExists: function() {
      },
      renderStravaSession: function() {
        let sessionString = '';
        let i = 1;
        this.orderedSessionEfforts.forEach(effort => {
          sessionString = sessionString + i + '  ' + this.renderDistance(effort.distance) + '  ' + this.renderTime(effort.moving_time) + '  ' + this.renderPace(effort.moving_time, effort.distance) + '\n'

          i ++
        })

        console.log('sessionString', sessionString)
        return sessionString
      }
    }
  }
</script>

