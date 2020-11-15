export default {
  data() {
    return {
    };
  },
  methods: {
    getAvgPaceData(activities) {
      return activities.map((activity) => {
        const paceFraction = (1000 / (activity.average_speed * 60)) * 60 * 1000;
        return activity.average_speed ? paceFraction : 0;
      });
    },
    getAvgHRData(activities) {
      return activities.map((activity) => (activity.average_heartrate ? activity.average_heartrate : 0));
    },
  },
};
