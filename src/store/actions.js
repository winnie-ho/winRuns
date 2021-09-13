import { stravaActions } from './stravaActions';
import { firebaseActions } from './firebaseActions';
import { openWeatherActions } from './openWeatherActions';

export const actions = {
  ...stravaActions,
  ...firebaseActions,
  ...openWeatherActions,
  fetchLocation: async (context) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        context.commit('setPosition', position.coords);
        context.dispatch('fetchWeatherNow');
      });
    }
  },
  setSelectedParkRun: (context, selectedParkRun) => context.commit('setSelectedParkRun', selectedParkRun),
  setTimeOrderedParkRuns: (context, timeOrderedParkRuns) => context.commit('setTimeOrderedParkRuns', timeOrderedParkRuns),
  setUserToken: (context, userToken) => context.commit('setUserToken', userToken),
  resetUploadStravaActivityResponse: (context) => context.commit('setUploadStravaActivityResponse', {}),
  resetActivity: (context) => context.commit('setActivity', {}),
};
export default actions;
