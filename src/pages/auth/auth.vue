<template src='./auth.html'></template>
<style scoped src='./auth.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import renderData from '../../mixins/renderData.js'
import { store } from '../../store/store.js'

export default {
  name: 'auth',
  components: {
    'nav-bar': navBar,
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'LOGIN',
      authCode: '',
      client_id: '15869',
      client_secret: '63fec0d321558ea536b0be0f155c6adf29b7b278',
      user: '',
      userToken: '',
      athleteId: '',
      // redirect_url: "https://win-runs.firebaseapp.com/"
      redirect_url: "http://localhost:8080"

    }
  },
  mounted () {
    this.setAuthCode();
  },

  created() {
  },

  methods: {
    setAuthCode: function () {
      let location = window.location.search;
      let length = location.length;

      if (location.search("code=") === -1) {
        return;
      } else {
        let start = location.search("code=");
        this.authCode = window.location.search.substr(start + 5, length);
        this.tokenExchange();
      }
    },
    login: function () {
      console.log('LOGGING IN...')
      const url = "https://www.strava.com/oauth/authorize?client_id=" + this.client_id + "&response_type=code&redirect_uri=" + this.redirect_url + "&scope=write&state=mystate&approval_prompt=force";
      
      window.location = url;
      if (this.authCode) {
        this.tokenExchange();
      }
    },
    tokenExchange: function () {
      let exchangeData = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.authCode
      };
      store.dispatch('tokenExchange', exchangeData);
    }
  },
  computed: {

  }
}
</script>


