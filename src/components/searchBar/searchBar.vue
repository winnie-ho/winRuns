<template src="./searchBar.html"></template>
<style scoped src='./searchBar.css'></style>

<script>
import renderData from "../../mixins/renderData.js";

export default {
  name: "search-bar",
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    setWordSearch(e) {
      this.searchWord = e.srcElement.value;
      this.$emit("searchWordChange", this.searchWord);
    },
    resetSearch() {
      document.getElementById("search-input").value = "";
      this.$emit("searchWordChange", "");
    }
  }
};
</script>
