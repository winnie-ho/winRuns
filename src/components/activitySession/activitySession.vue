<template src="./activitySession.html"></template>
<style scoped src='./activitySession.css'></style>

<script src>
  import renderData from '../../mixins/renderData.js'

  export default {
    name: 'activitySession',
    mixins: [ renderData ],
    data () {
      return {
        sessionSaved: false,
        rankMarkIcon: {
          0: '(1)',
          1: '(2)',
          2: '(3)'
        }
      }
    },
    props: ['createSession', 'sessionEfforts', 'sessionEffortsMergeMarkers'],
    methods: {
      saveSession: function() {
        let updatedActivity = {
          "commute": this.activity.commute,
          "trainer": this.activity.trainer,
          "description": this.renderStravaSession(this.activity.type),
          "name": this.activity.name,
          "type": this.activity.type,
          "private": this.activity.private,
          "gear_id": this.activity.gear_id
        }
        let actionParameters = [this.activity.id, updatedActivity]
        console.log(updatedActivity.description)
        this.$store.dispatch('updateStravaActivity', actionParameters)

        this.sessionSaved = true;
      },
      resetSession: function() {
        this.sessionSaved = false;
        this.$emit('onResetSessionEfforts')
      },
      closeSession: function() {
        this.$emit('onCloseSession');
        this.sessionSaved = false;
      },
      renderStravaSession: function(type) {
        let sessionString = '';
        let i = 1;
        let rankMark = '';

        this.orderedSessionEfforts.forEach(effort => {
          let index = i;
          if (i < 10) {
            index = "0" + i
          }

          if (this.finalLaps.length > 6) {
            rankMark = '';
            for (let i = 0; i < this.fastestSessionEffortIds.length; i ++ ){
              if (this.fastestSessionEffortIds[i] === effort.id){
                rankMark = this.rankMarkIcon[i];
              }
            };
          }

          if (type === 'Swim') {
            sessionString = sessionString + index + ' - ' + this.renderSwimDistance(effort.distance) +  ', ' + this.renderTime(effort.moving_time) +  ' (' + this.renderSwimPace(effort.moving_time, effort.distance) +  ') ' + rankMark + '\n';
          } else {
            sessionString = sessionString + index + '\t - \t' + this.renderDistance(effort.distance) +  ', \t' + this.renderTime(effort.moving_time) +  '\t(' + this.renderPace(effort.moving_time, effort.distance) +  ') ' + rankMark + '\n';
          }

          i++;
        })
        return sessionString
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
      finalLaps: function() {
        if(!this.sessionEfforts) return [];
        const processedLaps = [];
        this.sessionEfforts.forEach(lap => {
          const isMergeMarker = this.sessionEffortsMergeMarkers.includes(lap);
          const lapToMergeWith = this.sessionEffortsMergeMarkers.find(mergeMarker => mergeMarker.lap_index === lap.lap_index + 1);

          if (lapToMergeWith) {
            processedLaps.push(
              Object.assign({}, lap, {
                distance: lap.distance + lapToMergeWith.distance,
                moving_time: lap.moving_time + lapToMergeWith.moving_time
              })
            )
          } else if (!lapToMergeWith && !isMergeMarker) {
            processedLaps.push(lap);
          };
        });

        return processedLaps;
      },
      orderedSessionEfforts: function() {
        if (!this.finalLaps) return;
        return this.finalLaps.sort((a, b) => a.lap_index - b.lap_index);  
      },
      fastestSessionEffortIds: function() {
        if (!this.finalLaps) return;
        const fastestArray = this.finalLaps.slice().sort((a, b) => (a.moving_time/a.distance) - (b.moving_time/b.distance));
        const fastestIds = []
        for (let i = 0; i < 3; i ++ ){
          fastestIds.push(fastestArray[i].id);
        }
        return fastestIds;
      },  
      sessions: function() {
        if(!this.$store.state.sessions) return;
        return this.$store.state.sessions;
      },
      updateStravaActivityResponse: function () {
        if(!this.$store.state.updateStravaActivityResponse) return;
        return this.$store.state.updateStravaActivityResponse.ok;
      }
    }
  }
</script>

