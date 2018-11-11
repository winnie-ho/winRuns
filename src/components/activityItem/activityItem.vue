<template src="./activityItem.html"></template>
<style scoped src='./activityItem.css'></style>

<script>
import renderData from '../../mixins/renderData.js'
import changePage from '../../mixins/changePage.js';

export default {
  name: 'activityItem',
  components: {
  },
  mixins: [ renderData, changePage ],
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
        this.changePage(`/activity/${ activityId }`)
      })
    }
  },
  computed: {
  }
}
</script>
