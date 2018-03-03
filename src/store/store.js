import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    runStats: {},
    rideStats: {},
    swimStats: {}
  },
  getters: {},
  mutations: {
    setRunStats: (state, payload) => (state.runStats = payload),
    setRideStats: (state, payload) => (state.rideStats = payload),
    setSwimStats: (state, payload) => (state.swimStats = payload)
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
    }
  }
})
