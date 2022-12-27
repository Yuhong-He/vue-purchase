<template>
  <div class="list">
    <div class="header-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Product">
          <el-input v-model="formInline.name" placeholder="Product"></el-input>
        </el-form-item>
        <el-form-item label="Added Time">
          <el-date-picker v-model="formInline.time" type="date" placeholder="Select"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">Search</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div class="add-products">
      <el-button size="mini" type="warning" round>Add Products</el-button>
      <el-button size="mini" type="danger" round>Delete Many</el-button>
    </div>


    <div class="list-table">
      <el-table :data="tableData" border style="width: 100%" empty-text="No Data">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="65"></el-table-column>
        <el-table-column prop="title" label="Name" width="120"></el-table-column>
        <el-table-column prop="price" label="Price" width="100"></el-table-column>
        <el-table-column prop="category" label="Category" width="120"></el-table-column>
        <el-table-column label="Timestamp" width="180" show-overflow-tooltip>
          <template v-slot="scope">
            {{ formatTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="Character" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descs" label="Description" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="Operation">
          <template v-slot="scope">
            <el-button size="mini" icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger"
              @click="handleDelete(scope.$index, scope.row)">Del</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <pagination :total="total" :pageSize="pageSize" @getPagination="getPagination"></pagination>
  </div>
</template>

<script>
import pagination from "@/components/pagination"
import dayjs from "dayjs"
export default {
  components: {
    pagination
  },
  data() {
    return {
      formInline: {
        name: '',
        time: ''
      },
      tableData: [],
      total: 100,
      pageSize: 1,
      listTotal: [],
      searchStatus: false
    }
  },
  created() {
    this.getProductsList(1);
  },
  methods: {
    dayjs,
    async getProductsList(page) {
      let res = await this.$api.getProductsList({page});
      if(res.data.status === 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      }
    },
    getPagination(page) { // weird pagination
      if(this.searchStatus) {
        this.tableData = this.listTotal.slice((page - 1) * 8, page * 8);
        return ;
      }
      this.getProductsList(page);
    },
    onSearch() {
      if(!this.formInline.name) {
        this.searchStatus = false;
        this.getProductsList(1);
      }
      this.$api.getProductsSearch({search: this.formInline.name})
      .then(res => {
        if(res.data.status === 200) {
          this.listTotal = res.data.result;
          if(res.data.result.length > 8) {
            this.tableData = res.data.result.slice(0, 8);
            this.searchStatus = true;
          } else {
            this.tableData = res.data.result;
          }
          this.pageSize = 8;
          this.total = res.data.result.length;
        } else {
          this.tableData = [];
          this.pageSize = 8;
          this.total = 0;
        }
      });
    },
    formatTime(t) {
      return dayjs(t).format('YYYY-MM-DD HH:mm:ss');
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  padding: 10px;
  .header-search {
    background-color: whitesmoke;
    border-radius: 10px  10px 0 0 ;
    padding: 10px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .add-products {
    background-color: whitesmoke;
    border-radius: 0 0  10px 10px;
    padding: 10px;
  }
  .list-table {
    margin-top: 20px;
  }
}
</style>
