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
    updateStravaActivityResponse: {},
    uploadStravaActivityResponse: {},
    stravaUpload: {}
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
    clearFullParkRuns: (state) => (state.fullParkRuns = []),
    setSessions: (state, payload) => (state.sessions = payload),
    setUpdateStravaActivityResponse: (state, payload) => (state.updateStravaActivityResponse = payload),
    setUploadStravaActivityResponse: (state, payload) => (state.uploadStravaActivityResponse = payload),
    setStravaUpload: (state, payload) => (state.stravaUploadResponse = payload)
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
      Vue.http.get('https://www.strava.com/api/v3/athlete\?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setAthlete', response.data)
        })
    },
    fetchStats: (context) => {
      Vue.http.get('https://www.strava.com/api/v3/athletes/' + context.state.athlete.id + '/stats?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setStats', response.data)
        })
    },
    fetchActivities: (context, numberOfActivities) => {
      Vue.http.get('https://www.strava.com/api/v3/athlete/activities?per_page=' + numberOfActivities + '&access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setActivities', response.data)
        })
    },
    fetchActivity: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '\?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setActivity', response.data)
        })
    },
    fetchKudos: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/kudos\?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setKudos', response.data)
        })
    },
    fetchPhotos: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/photos?photo_sources=true&size=1000&access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setPhotos', response.data)
        })
    },
    fetchComments: (context, activityId) => {
      Vue.http.get('https://www.strava.com/api/v3/activities/' + activityId + '/comments\?access_token=' + context.state.userToken).then(
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
      context.commit('clearFullParkRuns')
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
      Vue.http.put('https://www.strava.com/api/v3/activities/' + actionParameters[0] + '\?access_token=' + context.state.userToken, actionParameters[1]).then(
        function (response) {
          console.log('response', response)
          context.commit('setUpdateStravaActivityResponse', response)
        })
    },
    uploadStravaActivity: (context, actionParameters) => {
      Vue.http.post('https://www.strava.com/api/v3/uploads\?access_token=' + context.state.userToken, actionParameters
      ).then(
        function (response) {
          console.log('RES', response.body.status)
          context.commit('setUploadStravaActivityResponse', response.body)
        },
        response => {
          console.log('RES', response.body.status)
          context.commit('setUploadStravaActivityResponse', response.body)
        }
      )
    },
    resetUploadStravaActivityResponse: (context) => {
      context.commit('setUploadStravaActivityResponse', {})
    },
    getStravaUpload: (context, uploadId) => {
      Vue.http.post('https://www.strava.com/api/v3/uploads/' + uploadId + '\?access_token=' + context.state.userToken).then(
        function (response) {
          context.commit('setStravaUploadResponse', response.body.id)
          console.log('GET UPLOAD ID', response.body)
        })
    }
  }
})
