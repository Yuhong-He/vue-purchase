<template>
  <el-menu default-active="/" class="el-menu-vertical-demo" router background-color="#004852" text-color="#fff" active-text-color="yellow" :collapse="isCollapse">
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">System Home</span>
    </el-menu-item>
    <el-submenu index="/products">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span slot="title">Product Manage</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/products/list">Product List</el-menu-item>
        <el-menu-item index="/products/category">Product Category</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/orders">
      <template slot="title">
        <i class="el-icon-shopping-cart-2"></i>
        <span slot="title">Order Manage</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/orders/list">Order List</el-menu-item>
        <el-menu-item index="/orders/collect">Order Collect</el-menu-item>
        <el-menu-item index="/orders/approve">Order Approve</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5" disabled>
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">System Manage</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">Role Manage</el-menu-item>
        <el-menu-item index="5-2">Department Manage</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: ['isCollapse']
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border: none;
}
</style>
