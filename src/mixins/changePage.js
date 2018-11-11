export default {
  data () {
    return {
    }
  },
  methods: {
    changePage: function (page) {
      this.$router.push(page)
    },
    viewActivity: function (activityId) {
      this.$store.dispatch('fetchActivity', activityId)
      this.$store.dispatch('fetchKudos', activityId)
      this.$store.dispatch('fetchPhotos', activityId)
      this.$store.dispatch('fetchComments', activityId).then(() => {
        this.changePage(`/activity/${ activityId }`)
      })
    }
  }
}
