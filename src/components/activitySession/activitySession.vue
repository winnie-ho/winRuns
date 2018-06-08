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
    created() {
      this.$store.dispatch('fetchSessions');
    },
    methods: {
      saveSession: function() {
        if (!this.sessionSaved) {
          this.$http.post('https://win-runs.firebaseio.com/sessions.json', this.sessionEfforts).then(function(data){
            this.sessionSaved = true;
            console.log('DATA', data, this.sessionSaved);
          })

          let activityId = this.sessionEfforts[0].activity.id;

          // set everything to the activity properties except description.
          let updatedActivity = {
            "commute": false,
            "trainer": false,
            "description": this.renderStravaSession,
            "name": this.sessionEfforts[0].activity.name,
            "type": "Run",
            "private": false,
            "gear_id": ""
          }
          let actionParameters = [activityId, updatedActivity]
          console.log('UPDATED ACTIVITY', updatedActivity)
          this.$store.dispatch('updateStravaActivity', actionParameters)
        }
      },
      resetSession: function() {
        console.log('RESET SESSION')
        this.$emit('onResetSessionEfforts')
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
        let resultString = '';
        let i = 1;
        this.orderedSessionEfforts.forEach(effort => {
          
          resultString = resultString + i + ' ' + this.renderDistance(effort.distance) + ' ' + this.renderTime(effort.moving_time) + ' ' + this.renderPace(effort.moving_time, effort.distance) + '\n'

          i ++
        })

        console.log('resultString', resultString)
        return resultString
      }
    }
  }
</script>

