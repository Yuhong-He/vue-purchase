<template>
  <div class="approve">
    <breadcrumb></breadcrumb>
    <div class="main">
      <el-input placeholder="Input PDF URL" v-model="pdf" class="inputBox" />
    </div>
    <PDFViewer :pdfSource="pdf"></PDFViewer>
  </div>
</template>

<script>
import PDFViewer from '@/components/PDFviewer/index.vue';
export default {
  components: {
    PDFViewer
  },
  data() {
    return {
      pdf: ""
    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.approve {
  margin: 10px;
  .main {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>
