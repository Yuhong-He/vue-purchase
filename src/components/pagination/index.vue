<template>
  <div class="pagination">
    <el-pagination
      @current-change="getPagination"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    getPagination(current) {
      this.$emit('getPagination', current);
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  padding: 10px;
  text-align: right;
}
</style>
