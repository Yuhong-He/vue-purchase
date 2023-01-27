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
    return axios.get(base.productList, {params});
  },
  getProductsSearch(params) {
    return axios.get(base.productSearch, {params});
  },
  deleteProduct(params) {
    return axios.get(base.productDelete, {params});
  },
  productCategory(params) {
    return axios.get(base.productCategory, {params});
  },
  productAdd(params) {
    return axios.get(base.productAdd, {params});
  },
  productEdit(params) {
	return axios.get(base.productEdit, {params});
  },
  productBatchDelete(params) {
    return axios.get(base.productBatchDelete, {params});
  },

  getOrderList(params) {
    return axios.get(base.orderList, {params});
  },

  login(params) {
    return axios.get(base.login, {params});
  },
  permission(params) {
    return axios.get(base.permission, {params});
  },
}

export default api;
