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
    return axios.get(base.productList,{params});
  },
  getProductsSearch(params) {
    return axios.get(base.productSearch,{params});
  },
  deleteProduct(params) {
    return axios.get(base.productDelete,{params});
  },
  productCategory(params) {
    return axios.get(base.productCategory,{params});
  }
}

export default api;
