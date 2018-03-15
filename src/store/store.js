import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    runStats: {},
    rideStats: {},
    swimStats: {},
    activities: {},
    activity: {},
    kudos: {},
    photos: {},
    comments: {},
    selectedParkRun: {}
  },
  mutations: {
    setRunStats: (state, payload) => (state.runStats = payload),
    setRideStats: (state, payload) => (state.rideStats = payload),
    setSwimStats: (state, payload) => (state.swimStats = payload),
    setActivities: (state, payload) => (state.activities = payload),
    setActivity: (state, payload) => (state.activity = payload),
    setKudos: (state, payload) => (state.kudos = payload),
    setPhotos: (state, payload) => (state.photos = payload),
    setComments: (state, payload) => (state.comments = payload),
    setParkRuns: (state, payload) => (state.parkRuns = payload),
    setSelectedParkRun: (state, payload) => (state.selectedParkRun = payload)
  },
  getters: {
    parkRuns: (state) => {
      if (!state.selectedParkRun.startCoords) return
      return state.activities.filter(activity => {
        return activity.start_latitude === state.selectedParkRun.startCoords[0] && activity.start_longitude === state.selectedParkRun.startCoords[1]
      })
    }
  },
  actions: {
    fetchStats: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athletes/3752965/stats?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setRunStats', response.data.ytd_run_totals)
          context.commit('setRideStats', response.data.ytd_ride_totals)
          context.commit('setSwimStats', response.data.ytd_swim_totals)
        })
    },
    fetchActivities: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setActivities', response.data)
        })
    },
    fetchActivity: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setActivity', response.data)
        })
    },
    fetchKudos: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/kudos\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setKudos', response.data)
        })
    },
    fetchPhotos: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/photos?photo_sources=true&size=1000&access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setPhotos', response.data)
        })
    },
    fetchComments: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/comments\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setComments', response.data)
        })
    },
    setSelectedParkRun: (context, selectedParkRun) => {
      context.commit('setSelectedParkRun', selectedParkRun)
    }
  }
})
