<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="clickTree">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    };
  },
  methods: {
    async loadNode(node, resolve) {
      if (node.level === 0) {
        let result = await this.productCategory(1);
        return resolve(result);
      } if (node.level >= 1) {
        let result = await this.productCategory(node.data.cid);
        return resolve(result);
      }
    },
    async productCategory(type) {
      let res = await this.$api.productCategory({type});
      if(res.data.status === 200) {
        return res.data.result;
      } else {
        return [];
      }
    },
    clickTree(data) {
      this.$emit('changeTree', data);
    }
  }
};
</script>

<style scoped>

</style>
