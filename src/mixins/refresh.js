export default {
  data() {
    return {
    };
  },
  methods: {
    async refreshEvents() {
      await this.$store.dispatch('fetchEvents');
      await this.$router.push('/events/');
    },
    async refreshHRZones() {
      await this.$store.dispatch('fetchHRZones');
      await this.$router.push('/maf/');
    },
    async refreshFixedStartDate() {
      await this.$store.dispatch('fetchFixedStartDate');
      await this.$router.push('/maf/');
    },
  },
};
