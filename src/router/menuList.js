import ProductManage from '@/views/ProductManage';
import ProductList from '@/views/ProductManage/ProductList';
import AddProduct from '@/views/ProductManage/ProductList/addProduct.vue';
import ProductCategory from '@/views/ProductManage/ProductCategory';
import OrderManage from '@/views/OrderManage';
import OrderList from '@/views/OrderManage/OrderList';
import OrderCollect from '@/views/OrderManage/OrderCollect';
import OrderApprove from '@/views/OrderManage/OrderApprove';
import SystemManage from '@/views/SystemManage';
import RoleManage from '@/views/SystemManage/role';
import DepartmentManage from '@/views/SystemManage/department';

export const menuList = [
  {
    path: '/products',
    name: 'Product',
    component: ProductManage,
    meta: {
      title: 'Product Manage'
    },
    redirect: '/products/list',
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: ProductList,
        meta: {
          title: 'Product List'
        }
      },
      {
        path: 'category',
        name: 'ProductCategory',
        component: ProductCategory,
        meta: {
          title: 'Product Category'
        }
      },
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct,
        meta: {
          title: 'Add Product',
          activeMenu: '/products/list'
        }
      }
    ]
  },
  {
    path: '/orders',
    name: 'Order',
    component: OrderManage,
    meta: {
      title: 'Order Manage'
    },
    redirect: '/orders/list',
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: OrderList,
        meta: {
          title: 'Order List'
        }
      },
      {
        path: 'collect',
        name: 'OrderCollect',
        component: OrderCollect,
        meta: {
          title: 'Order Collect'
        }
      },
      {
        path: 'approve',
        name: 'OrderApprove',
        component: OrderApprove,
        meta: {
          title: 'Order Approve'
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: SystemManage,
    meta: {
      title: 'System Manage'
    },
    redirect: '/system/role',
    children: [
      {
        path: 'role',
        name: 'RoleManage',
        component: RoleManage,
        meta: {
          title: 'Role Manage'
        }
      },
      {
        path: 'department',
        name: 'DepartmentManage',
        component: DepartmentManage,
        meta: {
          title: 'Department Manage'
        }
      }
    ]
  }
]
