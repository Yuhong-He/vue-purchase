<template>
  <div class="list">
    <breadcrumb></breadcrumb>

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
      <el-button size="mini" type="warning" @click="addProduct" round>Add Products</el-button>
      <el-button size="mini" type="danger" @click="batchDelete" round>Delete Many</el-button>
    </div>


    <div class="list-table">
      <el-table :data="tableData" border style="width: 100%" empty-text="No Data"
      @selection-change="changeSelection">
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
// import breadcrumb from "@/components/Breadcrumb" // Global registered
import pagination from "@/components/Pagination"
import dayjs from "dayjs"
import { mapMutations } from "vuex"
export default {
  components: {
    pagination,
    // breadcrumb
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
      currentPage: 1,
      listTotal: [],
      searchStatus: false,
      batchDeleteIds: []
    }
  },
  created() {
    this.getProductsList(1);
  },
  methods: {
    dayjs,
	...mapMutations('products', ['changeTitle', 'changeProducts']),
    async getProductsList(page) {
      let res = await this.$api.getProductsList({page});
      if(res.data.status === 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else if (res.data.status === 500 && this.currentPage > 1) {
        this.getPagination(this.currentPage - 1);
      }
    },
    getPagination(page) { // weird Pagination
      this.currentPage = page;
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
	  this.changeTitle('Edit');
	  this.changeProducts(row);
	  this.$router.push('/products/add');
    },
    handleDelete(index, row) {
      this.$confirm('Delete the data?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteProduct(row.id);
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: 'Delete Cancelled'
        });
      });
    },
    async deleteProduct(id) {
      let res = await this.$api.deleteProduct({id});
      if(res.data.status === 200) {
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Delete Success'
        });
      await this.getProductsList(this.currentPage);
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Delete Failed'
        });
      }
    },
    addProduct() {
	  this.changeTitle('Add');
      this.$router.push('/products/add');
    },
    batchDelete() {
      this.$confirm('Are your sure you want delete: ' + this.batchDeleteIds + '?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        let ids = this.batchDeleteIds.join(',');
        this.doBatchDelete(ids);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Cancelled'
        });
      });
    },
    changeSelection(selection) {
      let arr = [];
      selection.forEach(ele => {
        arr.push(ele.id);
      });
      this.batchDeleteIds = arr;
    },
    async doBatchDelete(ids) {
      let res = await this.$api.productBatchDelete({ids});
      if(res.data.status === 200) {
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Delete Success'
        });
        await this.getProductsList(this.currentPage);
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Delete Failed'
        });
      }
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
    margin-top: 10px;
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
