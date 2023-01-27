import api from '@/api/index'
import {menuList} from '@/router/menuList';
import { rulesMenu } from '@/utils/rulesMenu';
import {baseRoutes} from '@/router';
import {cloneDeep} from 'lodash';

export default {
  namespaced: true,
  state: {
    dyMenuList: [],
  },
  getters: {

  },
  mutations: {
    setMenuList(state, payload) {
      state.dyMenuList = payload;
    },
    deleteMenuList(state) {
      state.dyMenuList = [];
    }
  },
  actions: {
    getMenuList(context) {
      return new Promise((resolve, reject) => {
        api.permission({
          token: context.rootState.login.userInfo.token
        }).then(res => {
          let menus = rulesMenu(menuList, res.data.data);
          let routes = cloneDeep(baseRoutes[0].children);
          routes.push(...menus);
          context.commit('setMenuList', routes);
          // router.addRoutes(baseRoutes);
          // router.options.routes.push(baseRoutes);
          // console.log(router);
          resolve(baseRoutes)
        });
      });
    }
  }
}
