// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import xml2js from 'xml2js';
import * as fs from 'fs-web';
import ElementUI from 'element-ui';
import i18n from 'vue-i18n';
import locale from 'element-ui/lib/locale/lang/en';
import { store } from './store/store';
import router from './router';
import App from './App.vue';

Vue.use(VueResource);
Vue.use(xml2js);
Vue.use(fs);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.use(i18n);
Vue.config.lang = 'en';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
  router,
  components: { App },
  template: '<App/>',
});
