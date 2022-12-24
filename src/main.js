import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
import './assets/css/reset.css';
// eslint-disable-next-line import/order
import { library } from '@fortawesome/fontawesome-svg-core';
// eslint-disable-next-line import/order
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line import/order
import {
  faUserSecret,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faHouse);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
