<template src='./auth.html'></template>
<style scoped src='./auth.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue';
import renderData from '../../mixins/renderData';
import { store } from '../../store/store';
import changePage from '../../mixins/changePage';

export default {
  name: 'auth',
  components: {
    navBar,
  },
  mixins: [renderData, changePage],
  data() {
    return {
      pageTitle: 'LOGIN',
      authCode: '',
      client_id: '15869',
      client_secret: '63fec0d321558ea536b0be0f155c6adf29b7b278',
      user: '',
      userToken: '',
      athleteId: '',
      // redirect_url: 'https://win-runs.firebaseapp.com'
      redirect_url: 'http://localhost:8080',
    };
  },
  mounted() {
    this.checkStoredCreds();
    this.setAuthCode();
  },

  methods: {
    checkStoredCreds() {
      if (sessionStorage.userToken) {
        this.userToken = sessionStorage.userToken;
        this.athleteId = sessionStorage.athleteId;
        this.$store.dispatch('setUserToken', sessionStorage.userToken);
        this.$store.dispatch('fetchAthlete', sessionStorage.athleteId);
      } else {
        sessionStorage.clear();
        this.setAuthCode();
      }
    },
    setAuthCode() {
      const location = window.location.search;
      if (location.search('code=') === -1) return;
      const start = location.search('code=') + 5;
      this.authCode = location.substr(start, 40);
      this.tokenExchange();
    },
    login() {
      console.log('LOGGING IN...');
      window.location = `https://www.strava.com/oauth/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_url}&scope=read_all,activity:read_all,activity:write&state=mystate&approval_prompt=auto`;

      if (this.authCode) {
        this.tokenExchange();
      }
    },
    tokenExchange() {
      const exchangeData = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.authCode,
      };
      store.dispatch('tokenExchange', exchangeData);
    },
  },
  computed: {
    athlete() {
      return this.$store.state.athlete;
    },
  },
};
</script>
