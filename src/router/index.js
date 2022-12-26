import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout';
import Login from '@/views/Login';
import Home from '@/views/Home';
import ProductManage from '@/views/ProductManage';
import ProductList from '@/views/ProductManage/ProductList';
import ProductCategory from '@/views/ProductManage/ProductCategory';
import OrderManage from '@/views/OrderManage';
import OrderList from '@/views/OrderManage/OrderList';
import OrderCollect from '@/views/OrderManage/OrderCollect';
import OrderApprove from '@/views/OrderManage/OrderApprove';

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/products',
        name: 'Product',
        component: ProductManage,
        children: [
          {
            path: 'list',
            name: 'ProductList',
            component: ProductList
          },
          {
            path: 'category',
            name: 'ProductCategory',
            component: ProductCategory
          }
        ]
      },
      {
        path: '/orders',
        name: 'Order',
        component: OrderManage,
        children: [
          {
            path: 'list',
            name: 'OrderList',
            component: OrderList
          },
          {
            path: 'collect',
            name: 'OrderCollect',
            component: OrderCollect
          },
          {
            path: 'approve',
            name: 'OrderApprove',
            component: OrderApprove
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
