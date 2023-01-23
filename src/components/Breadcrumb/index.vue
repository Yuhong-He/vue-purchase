<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in navData" :key="item.path" :to="{ path: '/' }">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {

  },
  computed: {
    navData() {
      console.log(this.$route.matched);
      let match = this.$route.matched;
      match[0].path = "/";
      return match;
    }
  }
};
</script>

<style scoped>

</style>
