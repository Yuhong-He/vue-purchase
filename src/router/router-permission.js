import router from '@/router/index';
import store from '@/store';

router.beforeEach((to, from, next) => {
  if (to.matched.length && !to.matched.some(item => item.meta.isLogin)) { // need login
    next();
  } else { // need login
    let token = store.state.login.userInfo.token;
    if(token) {
      if(store.state.menu.dyMenuList.length > 0) { // already has router
        next();
      } else { // doesn't have router
        store.dispatch('menu/getMenuList')
          .then(baseRoutes => {
            baseRoutes.forEach((route) => {
              router.addRoute(route);
            });
            next({...to, replace:true});
          });
      }
      // next();
    } else {
      next('/login');
    }
  }
})
