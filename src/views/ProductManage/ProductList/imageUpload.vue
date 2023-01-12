<template>
  <div>
    <el-upload
      :action="url"
      ref="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
	  :file-list="fileList"
      :limit="1"
      :on-exceed="handleExceed"
    >
      <div v-if="isShow" slot="tip" class="el-upload__tip">Maximum 1 image</div>
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import {upload, host} from '@/api/base'

export default {
	props: {
		fileList: {
			type:Array,
			default:function() {
				return []
			}
		}
	},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      url: upload,
      isShow: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      this.isShow = false;
      let url = response.url.slice(7);
      this.$emit('sendImage', host + '/' + url);
    },
    handleExceed(files, fileList) {
      this.isShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.el-upload__tip {
  color: red;
}
</style>
