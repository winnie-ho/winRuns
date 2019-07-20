export default {
  data () {
    return {
    }
  },
  methods: {
    async refreshEvents () {
      await this.$store.dispatch('fetchEvents')
      await this.$router.push('/events/')
    }
  }
}
