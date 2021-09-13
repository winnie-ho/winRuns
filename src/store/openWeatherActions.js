import Vue from 'vue';

export const openWeatherActions = {
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
};
export default openWeatherActions;
