export default {
  data() {
    return {
    };
  },
  methods: {
    getActivitiesAvgPaceData(activities) {
      return activities.map((activity) => {
        const paceFraction = (1000 / (activity.average_speed * 60)) * 60 * 1000;
        return activity.average_speed ? paceFraction : 0;
      });
    },
    getPaceData(speeds) {
      return speeds.map((speed) => (1000 / (speed * 60)) * 60 * 1000);
    },
    getActivitiesAvgHRData(activities) {
      return activities.map((activity) => (activity.average_heartrate ? activity.average_heartrate : 0));
    },
  },
};
