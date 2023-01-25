<template>
  <div>
    <div class="header">
      <div class="collapse-icon">
        <i v-if="!isCollapse" @click="changeMenu" class="el-icon-s-fold"></i>
        <i v-else @click="changeMenu" class="el-icon-s-unfold"></i>
      </div>
      <div class="info">
        <span>{{ nowTime }}</span>
        <span class="vertical-bar">|</span>
        <el-dropdown
          :show-timeout='showTimeout'
          @command="handleCommand">
          <span class="el-dropdown-link">
            <font-awesome-icon icon="fa-solid fa-language" /><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myEn">English</el-dropdown-item>
            <el-dropdown-item command="myZh">中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="vertical-bar">|</span>
        <span>Welcome: XXX</span>
        <span class="vertical-bar">|</span>
        <span class="logout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    'isCollapse': Boolean
  },
  data() {
    return {
      nowTime: '',
      showTimeout: 50
    }
  },
  mounted() {
    this.showTimes();
  },
  methods: {
    changeMenu() {
      this.$emit('changeMenu');
    },
    showTimes() {
      this.nowTime = new dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      setInterval(this.showTimes, 1000);
    },
    handleCommand(val) {
      this.$i18n.locale = val;
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  background: #004852;
  height: 50px;
  line-height: 50px;
  color: #fff;
  width: 100%;
  display: flex;
  .collapse-icon {
    font-size: 2em;
    padding-left: 5px;
    cursor: pointer;
  }
  .info {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    font-size: 1.2em;
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
  .vertical-bar {
    padding: 10px;
  }
  .logout {
    cursor: pointer;
  }
}
</style>
