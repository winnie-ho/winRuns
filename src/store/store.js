import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import parkRunDirectory from '../mixins/parkRunDirectory';
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
    parkRuns: (state) => {
      // -- To get park runs in mid run --
      // the detailed Park Run contains all known strava segment_efforts of the park run within the time frame of the park run (09:30 to 10:30)
      const runsOnCorrectDay = state.activitiesInPeriod.filter(activity => activity.type === 'Run' && (
        new Date(activity.start_date_local).getDay() === 6
        || (new Date(activity.start_date_local).getMonth() === 11 && new Date(activity.start_date_local).getDate() === 25)
        || (new Date(activity.start_date_local).getMonth() === 0 && new Date(activity.start_date_local).getDate() === 1)

      ));
      const finalRuns = [];
      runsOnCorrectDay.forEach(run => {
        parkRunDirectory.forEach(parkRunLocation => {
          if (run.start_latitude.toFixed(2) == parkRunLocation.startCoords[0] && run.start_longitude.toFixed(2) == parkRunLocation.startCoords[1]) {
            finalRuns.push(run);
          }
        });
      });

      return finalRuns;
    },
    dateOrderedFullParkRuns: (state) => state.full && state.fullParkRuns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
    kmSessions: (state) => state.activities.length && state.activities.filter((activity) => activity.name.search('5x 1km') !== -1),
    dateOrderedFullKmSessions: (state) => state.fullKmSessions && state.fullKmSessions.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
  },
  actions,
});
