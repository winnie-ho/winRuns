<template src="./navBarBtn.html"></template>
<style scoped src='./navBarBtn.css'></style>

<script>
import changePage from '../../mixins/changePage.js';

export default {
  name: 'navBarBtn',
  components: {
  },
  mixins: [ changePage ],
  props: [ 'pages', 'btnIcon', 'path' ],
  data () {
    return {
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    },
  computed: {
    pageSelected(){
      return this.pages.find(page => page === this.$route.path);
    }
  }
}
</script>
