import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import { actions } from './actions';

Vue.use(Vuex);
Vue.use(VueResource);

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const store = new Vuex.Store({
  state: {
    athlete: {},
    stats: {},
    activities: {},
    activity: {},
    kudos: {},
    photos: {},
    comments: {},
    activityStream: [],
    selectedParkRun: {},
    weatherNow: {},
    weatherForecast: {},
    userToken: '',
    fullParkRuns: [],
    fullKmSessions: [],
    sessions: [],
    events: [],
    updateStravaActivityResponse: {},
    uploadStravaActivityResponse: {},
    stravaUpload: {},
    position: {},
    activitiesInPeriod: [],
  },
  mutations: {
    setAthlete: (state, payload) => (state.athlete = payload),
    setStats: (state, payload) => (state.stats = payload),
    setActivities: (state, payload) => (state.activities = payload),
    setActivity: (state, payload) => (state.activity = payload),
    setKudos: (state, payload) => (state.kudos = payload),
    setPhotos: (state, payload) => (state.photos = payload),
    setComments: (state, payload) => (state.comments = payload),
    setActivityStream: (state, payload) => (state.activityStream = payload),
    setParkRuns: (state, payload) => (state.parkRuns = payload),
    setSelectedParkRun: (state, payload) => (state.selectedParkRun = payload),
    setPosition: (state, payload) => (
      state.position = {
        lat: payload.latitude,
        lng: payload.longitude,
      }
    ),
    setWeatherNow: (state, payload) => (state.weatherNow = payload),
    setWeatherForecast: (state, payload) => (state.weatherForecast = payload),
    setTimeOrderedParkRuns: (state, payload) => (state.timeOrderedParkRuns = payload),
    setUserToken: (state, payload) => (state.userToken = payload),
    setFullParkRuns: (state, payload) => (state.fullParkRuns.push(payload)),
    clearFullParkRuns: (state) => (state.fullParkRuns = []),
    setFullKmSessions: (state, payload) => (state.fullKmSessions.push(payload)),
    clearFullKmSessions: (state) => (state.fullKmSessions = []),
    setSessions: (state, payload) => (state.sessions = payload),
    setEvents: (state, payload) => (state.events = payload),
    setUpdateStravaActivityResponse: (state, payload) => (state.updateStravaActivityResponse = payload),
    setUploadStravaActivityResponse: (state, payload) => (state.uploadStravaActivityResponse = payload),
    setStravaUpload: (state, payload) => (state.stravaUploadResponse = payload),
    setActivitiesInPeriod: (state, payload) => (state.activitiesInPeriod = payload),
  },
  getters: {
    parkRuns: (state) => state.selectedParkRun.startCoords && state.activitiesInPeriod.filter((activity) => activity.start_latitude && activity.start_latitude.toFixed(2) == 55.98 && activity.start_longitude && activity.start_longitude.toFixed(2) == -3.29).sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
    dateOrderedFullParkRuns: (state) => state.full && state.fullParkRuns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
    kmSessions: (state) => state.activities.length && state.activities.filter((activity) => activity.name.search('5x 1km') !== -1),
    dateOrderedFullKmSessions: (state) => state.fullKmSessions && state.fullKmSessions.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
  },
  actions,
});
