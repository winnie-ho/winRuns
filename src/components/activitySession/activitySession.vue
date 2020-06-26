<template src='./activitySession.html'></template>
<style scoped src='./activitySession.css'></style>

<script src>
import renderData from '../../mixins/renderData';

export default {
  name: 'activitySession',
  mixins: [renderData],
  data() {
    return {
      sessionSaved: false,
      rankMarkIcon: {
        0: '(1)',
        1: '(2)',
        2: '(3)',
      },
    };
  },
  props: ['createSession', 'sessionEfforts', 'sessionEffortsMergeMarkers'],
  methods: {
    saveSession() {
      const updatedActivity = {
        commute: this.activity.commute,
        trainer: this.activity.trainer,
        description: this.renderStravaSession(this.activity.type),
        name: this.activity.name,
        type: this.activity.type,
        private: this.activity.private,
        gear_id: this.activity.gear_id,
      };
      const actionParameters = [this.activity.id, updatedActivity];
      console.log(updatedActivity.description);
      this.$store.dispatch('updateStravaActivity', actionParameters);

      this.sessionSaved = true;
    },
    resetSession() {
      this.sessionSaved = false;
      this.$emit('onResetSessionEfforts');
    },
    closeSession() {
      this.$emit('onCloseSession');
      this.sessionSaved = false;
    },
    renderStravaSession(type) {
      let sessionString = '';
      let i = 1;
      let rankMark = '';

      this.orderedSessionEfforts.forEach(effort => {
        let index = i;
        if (i < 10) {
          index = `0${i}`;
        }

        if (this.finalLaps.length > 6) {
          rankMark = '';
          for (let j = 0; j < this.fastestSessionEffortIds.length; j++) {
            if (this.fastestSessionEffortIds[j] === effort.id) {
              rankMark = this.rankMarkIcon[j];
            }
          }
        }

        if (type === 'Swim') {
          sessionString = `${sessionString + index} - ${this.renderSwimDistance(effort.distance)}, ${this.renderTime(effort.moving_time)} (${this.renderSwimPace(effort.moving_time, effort.distance)}) ${rankMark}\n`;
        }
        if (type === 'Ride' || type === 'VirtualRide') {
          sessionString = `${sessionString + index} - ${this.renderDistance(effort.distance)}, ${this.renderTime(effort.moving_time)} (${this.renderSpeed((effort.distance / effort.moving_time))}) ${rankMark}\n`;
        } else {
          sessionString = `${sessionString + index} - ${this.renderDistance(effort.distance)}, ${this.renderTime(effort.moving_time)} (${this.renderPace(effort.moving_time, effort.distance)}) ${rankMark}\n`;
        }

        i++;
      });
      return sessionString;
    },
  },
  computed: {
    activity() {
      return this.$store.state.activity;
    },
    finalLaps() {
      if (!this.sessionEfforts) return [];
      const processedLaps = [];
      this.sessionEfforts.forEach(lap => {
        const isMergeMarker = this.sessionEffortsMergeMarkers.includes(lap);
        const lapToMergeWith = this.sessionEffortsMergeMarkers.find(
          mergeMarker => mergeMarker.lap_index === lap.lap_index + 1,
        );

        if (lapToMergeWith) {
          processedLaps.push({
            ...lap,
            distance: lap.distance + lapToMergeWith.distance,
            moving_time: lap.moving_time + lapToMergeWith.moving_time,
          });
        } else if (!lapToMergeWith && !isMergeMarker) {
          processedLaps.push(lap);
        }
      });

      return processedLaps;
    },
    orderedSessionEfforts() {
      return this.finalLaps && this.finalLaps.sort((a, b) => a.lap_index - b.lap_index);
    },
    fastestSessionEffortIds() {
      const fastestArray = this.finalLaps
        .slice()
        .sort((a, b) => a.moving_time / a.distance - b.moving_time / b.distance);
      const fastestIds = [];
      for (let i = 0; i < 3; i++) {
        fastestIds.push(fastestArray[i].id);
      }
      return this.finalLaps && fastestIds;
    },
    sessions() {
      return this.$store.state.sessions;
    },
    updateStravaActivityResponse() {
      return this.$store.state.updateStravaActivityResponse.ok;
    },
    updateStravaActivityResponseError() {
      return this.$store.state.updateStravaActivityResponse.status === 400;
    },
  },
};
</script>
