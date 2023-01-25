<template>
  <div class="list">
    <breadcrumb></breadcrumb>

    <div class="header"></div>

    <div class="header-btn">
      <el-button type="warning" size="mini" @click="goToOrderCollect" round>Order Collect</el-button>
      <downloadCSV
        style="display: inline-block; margin-left: 10px;"
        :data="tableData"
        :fields="json_fields"
        name="data.csv"
      >
        <el-button type="warning" size="mini" @click="downloadExcel" round>Export</el-button>
      </downloadCSV>
    </div>

    <div class="list-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="code" label="Order ID">
          <template v-slot="scope">
            <span style="color: blue; cursor: pointer" @click="orderDesc(scope.row)">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="Customer"></el-table-column>
        <el-table-column prop="company" label="Company"></el-table-column>
        <el-table-column prop="phone" label="Tel"></el-table-column>
        <el-table-column prop="yudingTime" label="Time">
          <template v-slot="scope">
            {{ dayjs(scope.row.yudingTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="Price"></el-table-column>
        <el-table-column prop="huizongStatus" label="Status">
          <template v-slot="scope">
            <span v-if="scope.row.huizongStatus === 1">Not Collected</span>
            <span v-else>Collected</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination :total="total" :pageSize="pageSize" @getPagination="getPagination"></pagination>

    <el-drawer :visible.sync="drawer" :direction="direction" :modal="false">
      <orderDesc></orderDesc>
    </el-drawer>
  </div>
</template>

<script>
import pagination from "@/components/Pagination"
import dayjs from "dayjs"
import orderDesc from "./orderDesc.vue"
export default {
  components: {
    pagination,
    orderDesc
  },
  data() {
    return {
      tableData: [],
      total: 100,
      pageSize: 1,
      currentPage: 1,
      drawer: false,
      direction: 'rtl',
      json_fields: []
    }
  },
  created() {
    this.getOrderList(1);
  },
  methods: {
    dayjs,
    async getOrderList(page) {
      let res = await this.$api.getOrderList({ page });
      if(res.status === 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else {
        console.log("Error: " + res);
        this.tableData = [];
        this.total = 0;
        this.pageSize = 0;
      }
    },
    getPagination(page) {
      this.currentPage = page;
      this.getOrderList(page);
    },
    orderDesc(row) {
      this.drawer = true;
    },
    goToOrderCollect() {
      this.$router.push('/orders/collect');
    },
    downloadExcel() {
      this.json_fields = ['code', 'ordername', 'company', 'phone', 'yudingTime', 'price'];
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  margin: 10px;
  background: #fff;
  padding: 20px;
}
.header-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  padding: 10px;
}
</style>
