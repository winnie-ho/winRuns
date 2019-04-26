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
  methods: {
  },
  computed: {
  }
}
</script>
