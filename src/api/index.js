import base from './base';
import axios from 'axios';

const api = {
  getHomeCount() {
    return axios.get(base.homeCount);
  },
  getHomeCharts() {
    return axios.get(base.homeFormat);
  },
  getHomeOrder() {
    return axios.get(base.homeOrder);
  },

  getProductsList(params) {
    return axios.get(base.productsList,{params});
  },
  getProductsSearch(params) {
    return axios.get(base.productSearch,{params});
  }
}

export default api;
