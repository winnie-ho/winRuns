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
    comments: {}
  },
  getters: {},
  mutations: {
    setRunStats: (state, payload) => (state.runStats = payload),
    setRideStats: (state, payload) => (state.rideStats = payload),
    setSwimStats: (state, payload) => (state.swimStats = payload),
    setActivities: (state, payload) => (state.activities = payload),
    setActivity: (state, payload) => (state.activity = payload),
    setKudos: (state, payload) => (state.kudos = payload),
    setPhotos: (state, payload) => (state.photos = payload),
    setComments: (state, payload) => (state.comments = payload)
  },
  actions: {
    fetchStats: (context) => {
      console.log('FETCH STATS ACTION')
      Vue.http.get('https://www.strava.com/api/v3/athletes/3752965/stats?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setRunStats', response.data.ytd_run_totals)
          context.commit('setRideStats', response.data.ytd_ride_totals)
          context.commit('setSwimStats', response.data.ytd_swim_totals)
        })
    },
    fetchActivities: (context) => {
      console.log('FETCH ACTIVITIES ACTION')
      Vue.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setActivities', response.data)
        })
    },
    fetchActivity: (context, activityId) => {
      console.log('FETCH ACTIVITY ACTION')
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setActivity', response.data)
        })
    },
    fetchKudos: (context, activityId) => {
      console.log('FETCH KUDOS ACTION')
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/kudos\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setKudos', response.data)
        })
    },
    fetchPhotos: (context, activityId) => {
      console.log('FETCH PHOTOS ACTION')
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/photos?photo_sources=true&size=1000&access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setPhotos', response.data)
        })
    },
    fetchComments: (context, activityId) => {
      console.log('FETCH COMMENTS ACTION')
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/comments\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setComments', response.data)
        })
    }
  }
})
