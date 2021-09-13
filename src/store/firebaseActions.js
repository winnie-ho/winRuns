import Vue from 'vue';

export const firebaseActions = {
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
};
export default firebaseActions;
