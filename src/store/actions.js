import Vue from 'vue';

export const actions = {
  fetchAthlete: (context) => {
    Vue.http.get(`https://www.strava.com/api/v3/athlete?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setAthlete', response.data),
    );
  },
  fetchStats: (context) => {
    Vue.http.get(`https://www.strava.com/api/v3/athletes/${sessionStorage.athleteId || context.state.athlete.id}/stats?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setStats', response.data),
    );
  },
  fetchActivitiesInPeriod: (context, options) => {
    const {
      activitiesPerPage,
      before,
      after,
      pageRequests,
    } = options;

    const activities = [];

    for (let i = 1; i <= pageRequests; i++) {
      Vue.http.get(`https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${i}&per_page=${activitiesPerPage}&access_token=${sessionStorage.userToken || context.state.userToken}`).then(
        (response) => {
          activities.push(...response.data);
        },
      );
    }
    context.commit('setActivitiesInPeriod', activities);
  },
  fetchActivity: (context, activityId) => {
    Vue.http.get(`https://www.strava.com/api/v3/activities/${activityId}?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setActivity', response.data),
    );
  },
  resetActivity: (context) => context.commit('setActivity', {}),
  fetchKudos: (context, activityId) => {
    Vue.http.get(`https://www.strava.com/api/v3/activities/${activityId}/kudos?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setKudos', response.data),
    );
  },
  fetchPhotos: (context, activityId) => {
    Vue.http.get(`https://www.strava.com/api/v3/activities/${activityId}/photos?photo_sources=true&size=1000&access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setPhotos', response.data),
    );
  },
  fetchComments: (context, activityId) => {
    Vue.http.get(`https://www.strava.com/api/v3/activities/${activityId}/comments?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setComments', response.data),
    );
  },
  fetchActivityStream: (context, activityId) => {
    const keys = ['time', 'moving', 'heartrate', 'velocity_smooth'];
    Vue.http.get(`https://www.strava.com/api/v3/activities/${activityId}/streams?keys=${keys}&key_by_type=true&access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setActivityStream', response.data),
    );
  },
  setSelectedParkRun: (context, selectedParkRun) => context.commit('setSelectedParkRun', selectedParkRun),
  fetchLocation: async (context) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        context.commit('setPosition', position.coords);
        context.dispatch('fetchWeatherNow');
      });
    }
  },
  fetchWeatherNow: (context) => {
    if (context.state.position.lat && context.state.position.lng) {
      Vue.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${context.state.position.lat}&lon=${context.state.position.lng}&appid=b7114aca731d927ad002d0a518f38dfe`).then(
        (response) => context.commit('setWeatherNow', response.data),
      );
    }
  },
  fetchWeatherForecast: (context) => {
    if (context.state.position.lat && context.state.position.lng) {
      Vue.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${context.state.position.lat}&lon=${context.state.position.lng}&appid=b7114aca731d927ad002d0a518f38dfe`).then(
        (response) => context.commit('setWeatherForecast', response.data),
      );
    }
  },
  setTimeOrderedParkRuns: (context, timeOrderedParkRuns) => context.commit('setTimeOrderedParkRuns', timeOrderedParkRuns),
  tokenExchange: (context, exchangeData) => {
    Vue.http.post('https://www.strava.com/oauth/token', exchangeData).then(
      (response) => {
        sessionStorage.setItem('userToken', response.body.access_token);
        sessionStorage.setItem('athleteId', response.body.athlete.id);
        context.commit('setUserToken', response.body.access_token);
        context.commit('setAthlete', response.body.athlete);
      },
    );
  },
  setUserToken: (context, userToken) => context.commit('setUserToken', userToken),
  fetchRunsToAnalyse: (context, runIdsToAnalyse) => {
    context.commit('clearRunsToAnalyse');
    runIdsToAnalyse.forEach((runId) => {
      Vue.http.get(`https://www.strava.com/api/v3/activities/${runId}?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
        (response) => {
          context.commit('setRunsToAnalyse', response.body);
        },
      );
    });
  },
  fetchFullParkRuns: (context) => {
    context.commit('clearFullParkRuns');
    context.getters.parkRuns.forEach((parkRun) => {
      Vue.http.get(`https://www.strava.com/api/v3/activities/${parkRun.id}?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
        (response) => context.commit('setFullParkRuns', response.body),
      );
    });
  },
  fetchFullKmSessions: (context) => {
    context.commit('clearFullKmSessions');
    context.getters.kmSessions.forEach((kmSession) => {
      Vue.http.get(`https://www.strava.com/api/v3/activities/${kmSession.id}?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
        (response) => context.commit('setFullKmSessions', response.body),
      );
    });
  },
  fetchFixedStartDate: (context) => {
    Vue.http.get('https://win-runs.firebaseio.com/fixedStartDate.json').then((response) => {
      context.commit('setFixedStartDate', response.data);
    });
  },
  fetchHRZones: (context) => {
    Vue.http.get('https://win-runs.firebaseio.com/heartrateZones.json').then((response) => {
      context.commit('setHRZones', response.data);
    });
  },
  fetchEvents: (context) => {
    Vue.http.get('https://win-runs.firebaseio.com/events.json').then((response) => {
      const keys = Object.keys(response.data);
      const transformedEvents = keys.map((key) => (
        {
          ...response.data[key],
          id: key,
        }));
      context.commit('setEvents', transformedEvents);
    });
  },
  createEvent: (context, event) => Vue.http.post('https://win-runs.firebaseio.com/events.json', event).then(
    (data) => data.json(),
  ),
  deleteOrder: (context, eventId) => Vue.http.delete(`https://win-runs.firebaseio.com/events/${eventId}.json`).then(
    (data) => data.json(),
  ),
  updateEvent: (context, event) => Vue.http.put(`https://win-runs.firebaseio.com/events/${event.id}.json`, event).then(
    (data) => data.json(),
  ),
  updateHRZones: (context, hrZones) => Vue.http.put('https://win-runs.firebaseio.com/heartrateZones.json', hrZones).then(
    (data) => data.json(),
  ),
  updateFixedStartDate: (context, fixedStartDate) => Vue.http.put('https://win-runs.firebaseio.com/fixedStartDate.json', fixedStartDate).then(
    (data) => data.json(),
  ),
  updateStravaActivity: (context, actionParameters) => {
    Vue.http.put(`https://www.strava.com/api/v3/activities/${actionParameters[0]}?access_token=${sessionStorage.userToken || context.state.userToken}`, actionParameters[1]).then(
      (response) => context.commit('setUpdateStravaActivityResponse', response),
    );
  },
  uploadStravaActivity: (context, actionParameters) => {
    Vue.http.post(`https://www.strava.com/api/v3/uploads?access_token=${sessionStorage.userToken || context.state.userToken}`, actionParameters).then(
      (response) => context.commit('setUploadStravaActivityResponse', response.body),
      (response) => context.commit('setUploadStravaActivityResponse', response.body),
    );
  },
  resetUploadStravaActivityResponse: (context) => context.commit('setUploadStravaActivityResponse', {}),
  getStravaUpload: (context, uploadId) => {
    Vue.http.post(`https://www.strava.com/api/v3/uploads/${uploadId}?access_token=${sessionStorage.userToken || context.state.userToken}`).then(
      (response) => context.commit('setStravaUploadResponse', response.body.id),
    );
  },
};
export default actions;
