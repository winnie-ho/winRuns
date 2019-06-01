<template src='./auth.html'></template>
<style scoped src='./auth.css'></style>

<script>
import navBar from "../../components/navBar/navBar.vue";
import renderData from "../../mixins/renderData.js";
import { store } from "../../store/store.js";
import changePage from "../../mixins/changePage";

export default {
  name: "auth",
  components: {
    navBar
  },
  mixins: [renderData, changePage],
  data() {
    return {
      pageTitle: "LOGIN",
      authCode: "",
      client_id: "15869",
      client_secret: "63fec0d321558ea536b0be0f155c6adf29b7b278",
      user: "",
      userToken: "",
      athleteId: "",
      redirect_url: "https://win-runs.firebaseapp.com"
      // redirect_url: "http://localhost:8080",
    };
  },
  mounted() {
    this.checkStoredCreds();
  },

  created() {},

  methods: {
    checkStoredCreds() {
      if (localStorage.userToken) {
        this.userToken = localStorage.userToken;
        this.athleteId = localStorage.athleteId;
        this.$store.dispatch("setUserToken", localStorage.userToken);
        this.$store.dispatch("fetchAthlete", localStorage.athleteId);
      } else {
        this.setAuthCode();
      }
    },
    setAuthCode() {
      let location = window.location.search;
      if (location.search("code=") === -1) {
        return;
      } else {
        let start = location.search("code=") + 5;
        this.authCode = location.substr(start, 40);
        this.tokenExchange();
      }
    },
    login() {
      console.log("LOGGING IN...");
      window.location = `https://www.strava.com/oauth/authorize?client_id=${
        this.client_id
      }&response_type=code&redirect_uri=${
        this.redirect_url
      }&scope=view_private,write&state=mystate&approval_prompt=auto`;

      if (this.authCode) {
        this.tokenExchange();
      }
    },
    tokenExchange() {
      let exchangeData = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.authCode
      };
      store.dispatch("tokenExchange", exchangeData);
    }
  },
  computed: {
    athlete() {
      if (!this.$store.state.athlete) return;
      return this.$store.state.athlete;
    }
  }
};
</script>


