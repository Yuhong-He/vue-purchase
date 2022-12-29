<template>
  <div class="addProduct">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="type">Product Type List</div>
          <div class="tree"><ProductTree></ProductTree></div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="title">
            Add Product
          </div>
          <div class="wrapper">
            <el-form :model="productForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Category" prop="category">
                <span> {{ productForm.category }} </span>
              </el-form-item>
              <el-form-item label="Name" prop="title">
                <el-input v-model="productForm.title"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="Price" prop="price">
                    <el-input v-model="productForm.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Quantity" prop="num">
                    <el-input v-model="productForm.num"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Size" prop="size">
                    <el-input v-model="productForm.size"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Character" prop="sellPoint">
                <el-input v-model="productForm.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="Release">
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="Select" v-model="productForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">:</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="Select" v-model="productForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="Image" prop="image">
                <el-button>Upload</el-button>
              </el-form-item>
              <el-form-item label="Description" prop="descs">
                Markdown Editor
              </el-form-item>
              <div class="form-button">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                  <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductTree from './productTree.vue'


export default {
  components: {
    ProductTree
  },
  data() {
    return {
      productForm: {
        category: '',
        title: '',
        price: '',
        num: '',
        sellPoint: '',
        image: '',
        descs: false,
        date1: '',
        date2: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please enter the name', trigger: 'blur' },
          { min: 2, max: 10, message: 'Length 2 - 10', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please enter the price', trigger: 'blur' }
        ],
        num: [
          { required: true, message: 'Please enter the Quantity', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.addProduct {
  margin: 10px;
  font-size: 1.2em;
}
.menu {
  border: 1px solid black;
  height: 630px;
  .type {
    height: 50px;
    line-height: 50px;
    color: white;
    background-color: black;
    padding-left: 10px;
  }
}
.content {
  height: 633px;
  background-color: #f5f7d7;
  .title {
    background-color: gray;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    color: white;
    font-weight: bold;
  }
  .wrapper {
    padding: 20px 40px 10px 10px;
    .form-button {
      text-align: right;
    }
  }
}
</style>
