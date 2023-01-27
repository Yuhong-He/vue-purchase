import {cloneDeep} from 'lodash';

export function rulesMenu(menuList, dyMenuList) {
  let menu = [];
  // const arr = JSON.parse(JSON.stringify(menuList));
  const arr = cloneDeep(menuList);
  arr.forEach(one => {
    dyMenuList.forEach(two => {
      if(one.meta.title === two.name) {
        if(two.children && two.children.length > 0) { // check children matches
          one.children = rulesMenu(one.children, two.children);
        }
        menu.push(one);
      }
    })
  });
  return menu;
}
