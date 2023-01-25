import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './plugins/element.js';
import './assets/css/reset.css';
import 'normalize.css';
import i18n from './lang/index'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faRightFromBracket,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';
import api from './api';

library.add(faRightFromBracket);
library.add(faLanguage);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

import breadcrumb from "@/components/Breadcrumb"
Vue.component('breadcrumb', breadcrumb)

import JsonCSV from "vue-json-csv";
Vue.component("downloadCSV", JsonCSV);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
