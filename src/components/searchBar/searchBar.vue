<template src="./searchBar.html"></template>
<style scoped src='./searchBar.css'></style>

<script>
import renderData from '../../mixins/renderData.js'

export default {
  name: 'search-bar',
  components: {
  },
  data () {
    return {
      searchWord: ''
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    setWordSearch: function(e) {
      this.searchWord = e.srcElement.value;
      this.$emit('searchWordChange', this.searchWord);
    },
    resetSearch: function(){
      document.getElementById('search-input').value = '';
      this.$emit('searchWordChange', '');
    }
  },
  computed: {
  }
}
</script>
