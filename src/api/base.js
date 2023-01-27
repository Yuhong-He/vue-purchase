const base = {
  host: "http://localhost:6688",
  homeCount: '/api/home/dataCount',
  homeFormat: '/api/home/format',
  homeOrder: '/api/home/orderinfo',

  productList: '/api/product/list',
  productSearch: '/api/product/search',
  productDelete: '/api/product/deleteItemById',
  productCategory: '/api/product/itemCategory/selectItemCategoryByParentId',
  productAdd: '/api/product/insert',
  productEdit: '/api/product/edit',
  productBatchDelete: '/api/product/batchDelete',

  orderList: '/api/order/list',

  login: '/api/login',
  permission: '/api/permission'
}

export const host = base.host;

export const upload = '/api/upload';

export default base;
