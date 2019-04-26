export default {
  data () {
    return {
    }
  },
  methods: {
    changePage (page) {
      this.$router.push(page)
    },
    async viewActivity (activityId) {
      await this.$store.dispatch('fetchKudos', activityId)
      await this.$store.dispatch('fetchPhotos', activityId)
      await this.$store.dispatch('fetchComments', activityId)
      await this.$store.dispatch('fetchActivity', activityId)
      await this.changePage(`/activity/${activityId}`)
    }
  }
}
