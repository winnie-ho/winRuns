<template src="./activity.html"></template>
<style scoped src='./activity.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'activity',
  components: {
  },
  mixins: [ renderData ],
  props: ['activity'],
  data () {
    return {
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    viewActivity: function (activityId) {
      this.$store.dispatch('fetchActivity', activityId)
      this.$store.dispatch('fetchKudos', activityId)
      this.$store.dispatch('fetchPhotos', activityId)
      this.$store.dispatch('fetchComments', activityId).then(() => {
        this.$router.push('/activity/' + activityId)
      })
    }
  },
  computed: {
  }
}
</script>
