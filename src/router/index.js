import Vue from 'vue';
import VueRouter from 'vue-router';

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => {})
};
Vue.use(VueRouter);

import Layout from '@/views/Layout';
import Login from '@/views/Login';
import Home from '@/views/Home';

export const baseRoutes = [
  {
    path: '/',
    component: Layout,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home'
        }
      }
    ]
  },
]

export const routes = [
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
