import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    athlete: {},
    stats: {},
    activities: {},
    activity: {},
    kudos: {},
    photos: {},
    comments: {},
    selectedParkRun: {},
    weatherNow: {},
    weatherForecast: {},
    userToken: '',
    fullParkRuns: [],
    sessions: [],
    updateStravaActivityResponse: false
  },
  mutations: {
    setAthlete: (state, payload) => (state.athlete = payload),
    setStats: (state, payload) => (state.stats = payload),
    setActivities: (state, payload) => (state.activities = payload),
    setActivity: (state, payload) => (state.activity = payload),
    setKudos: (state, payload) => (state.kudos = payload),
    setPhotos: (state, payload) => (state.photos = payload),
    setComments: (state, payload) => (state.comments = payload),
    setParkRuns: (state, payload) => (state.parkRuns = payload),
    setSelectedParkRun: (state, payload) => (state.selectedParkRun = payload),
    setWeatherNow: (state, payload) => (state.weatherNow = payload),
    setWeatherForecast: (state, payload) => (state.weatherForecast = payload),
    setTimeOrderedParkRuns: (state, payload) => (state.timeOrderedParkRuns = payload),
    setUserToken: (state, payload) => (state.userToken = payload),
    setFullParkRuns: (state, payload) => (state.fullParkRuns.push(payload)),
    setSessions: (state, payload) => (state.sessions = payload),
    setUpdateStravaActivityResponse: (state, payload) => (state.updateStravaActivityResponse = payload)
  },
  getters: {
    parkRuns: (state) => {
      if (!state.selectedParkRun.startCoords) return
      return state.activities.filter(activity => {
        if (activity.start_latitude && activity.start_longitude) {
          return activity.start_latitude.toFixed(2) == state.selectedParkRun.startCoords[0] && activity.start_longitude.toFixed(2) == state.selectedParkRun.startCoords[1]
        }
      })
    },
    dateOrderedFullParkRuns: (state) => {
      if (!state.fullParkRuns) return
      return state.fullParkRuns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    }
  },
  actions: {
    fetchAthlete: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athlete\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1').then(
        function (response) {
          context.commit('setAthlete', response.data)
        })
    },
    fetchStats: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athletes/3752965/stats?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setStats', response.data)
        })
    },
    fetchActivities: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=' + context.state.userToken).then(
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
    },
    fetchWeatherNow: (context) => {
      Vue.http.get('https://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=b7114aca731d927ad002d0a518f38dfe').then(
        function (response) {
          context.commit('setWeatherNow', response.data)
        })
    },
    fetchWeatherForecast: (context) => {
      Vue.http.get('https://api.openweathermap.org/data/2.5/forecast?id=2650225&appid=b7114aca731d927ad002d0a518f38dfe').then(
        function (response) {
          context.commit('setWeatherForecast', response.data)
        })
    },
    setTimeOrderedParkRuns: (context, timeOrderedParkRuns) => {
      context.commit('setTimeOrderedParkRuns', timeOrderedParkRuns)
    },
    tokenExchange: (context, exchangeData) => {
      Vue.http.post('https://www.strava.com/oauth/token', exchangeData).then(
        function (response) {
          context.commit('setUserToken', response.body.access_token)
          context.commit('setAthlete', response.body.athlete)
        }
      )
    },
    fetchFullParkRuns: (context) => {
      context.getters.parkRuns.forEach(parkRun => {
        return Vue.http.get('https://www.strava.com/api/v3/activities/' + parkRun.id + '\?access_token=' + context.state.userToken).then(
          function (response) {
            context.commit('setFullParkRuns', response.body)
          }
        )
      })
    },
    // fetchSessions: (context, sessions) => {
    //   Vue.http.get('https://win-runs.firebaseio.com/sessions.json').then(function (data) {
    //     return data.json()
    //   }).then(function (data) {
    //     let sessions = []
    //     for (let key in data) {
    //       data[key].id = key
    //       sessions.push(data[key])
    //     }
    //     context.commit('setSessions', sessions)
    //   })
    // },
    updateStravaActivity: (context, actionParameters) => {
      Vue.http.put('https://www.strava.com/api/v3/activities/' + actionParameters[0] + '\?access_token=d0f9b2db60c6a57c7a86eaa9c7019ef9e30fbab1', actionParameters[1]).then(
        function (response) {
          context.commit('setUpdateStravaActivityResponse', response)
        })
    }
  }
})
