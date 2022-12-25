<template>
  <div class="layout">
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>

    <div class="content" :class="{active: isCollapse}">
      <Content @changeMenu="changeMenu" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import Content from './Content';

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    Menu,
    Content,
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    //width: 200px;
    background: #004852;
  }
  .content {
    padding-left: 200px;
    transition: all .5s;
  }
  .active {
    padding-left: 64px;
  }
}
</style>
