export default {
  data() {
    return {
    };
  },
  methods: {
    changePage(page) {
      this.$router.push(page);
    },
    viewActivity(activityId) {
      this.changePage(`/activity/${activityId}`);
    },
  },
};
