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
  props: ['isCollapse'],
  data() {
    return {
      nowTime: ''
    }
  },
  methods: {
    changeMenu() {
      this.$emit('changeMenu');
    },
    showTimes() {
      this.nowTime = new dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      setInterval(this.showTimes, 1000);
    }
  },
  created() {
    this.showTimes();
  }
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
  }
  .vertical-bar {
    padding: 10px;
  }
  .logout {
    cursor: pointer;
  }
}
</style>
