import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import login from './modules/login';
import menu from './modules/menu';
import createPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  products,
    login,
    menu
  },
  plugins: [
	  createPersistedstate({
		  key: 'product',
		  paths: ['products','login']
	  })
  ]
});
