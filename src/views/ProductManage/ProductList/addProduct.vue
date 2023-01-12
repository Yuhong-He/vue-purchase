<template>
  <div class="addProduct">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="type">Product Type List</div>
          <div class="tree">
            <ProductTree @changeTree="changeTree"></ProductTree>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="title">
            {{ title }} Product
          </div>
          <div class="wrapper">
            <el-form :model="productForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Category" prop="category">
                <span class="category"> {{ productForm.category }} </span>
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
                <ImageUpload @sendImage="sendImage" :fileList="fileList"></ImageUpload>
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
import ImageUpload from './imageUpload.vue'
import { mapState } from "vuex"

export default {
  components: {
    ProductTree,
    ImageUpload
  },
  computed: {
	...mapState('products', ['title', 'productData'])
  },
  mounted() {
	if(this.title === 'Edit') {
		this.productForm = this.productData;
		let img = this.productData.image;
		console.log('Parse image ------ ' ,img);
		let arr = [];
		if(img) {
			let obj = {};
			obj.url = img;
			arr.push(obj);
		}
		this.fileList = arr;
	}
  },
  data() {
    return {
	  fileList: [],
      productForm: {
        cid: '',
        category: '',
        title: '',
        price: '',
        num: '',
        sellPoint: '',
        image: '',
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
          let {cid, category, title, price, num, sellPoint, image} = this.productForm;
          this.$api.productAdd({
            cid, category, title, price, num, sellPoint, image
          })
          .then(res => {
            if(res.data.status === 200) {
              this.$router.push('/products/list');
              this.$message({
                showClose: true,
                message: 'Add success!',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: 'Oops... Add failed',
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeTree(data) {
      this.productForm.category = data.name;
      this.productForm.cid = data.cid;
    },
    sendImage(url) {
      this.productForm.image = url;
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
  min-height: 650px;
  .type {
    height: 50px;
    line-height: 50px;
    color: white;
    background-color: black;
    padding-left: 10px;
  }
}
.content {
  min-height: 653px;
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
  .category {
    color: green;
    font-size: 1.5em;
  }
}
</style>
