<template src="./navBarBtn.html"></template>
<style scoped src='./navBarBtn.css'></style>

<script>
import changePage from '../../mixins/changePage';

export default {
  name: 'navBarBtn',
  mixins: [changePage],
  props: ['pages', 'btnIcon', 'path', 'title'],
  data() {
    return {};
  },
  computed: {
    pageSelected() {
      return this.pages.find((page) => page === this.$route.path);
    },
  },
};
</script>
