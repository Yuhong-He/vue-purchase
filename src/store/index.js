import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
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
	  products
  },
  plugins: [
	  createPersistedstate({
		  key: 'product',
		  paths: ['products']
	  })
  ]
});
