<template>
  <div id="app">
    <div class="app-header">
      <template v-if="isLoading">
        Loading...
      </template>

      <template v-else>
      <span v-if="showAllPages">
        {{ pageCount }} page(s)
      </span>

        <span v-else>
        <button :disabled="page <= 1" @click="page--">❮</button>

        {{ page }} / {{ pageCount }}

        <button :disabled="page >= pageCount" @click="page++">❯</button>
      </span>

        <label class="right">
          <input v-model="showAllPages" type="checkbox">

          Show all pages
        </label>
      </template>
    </div>

    <div class="app-content">
      <VuePDF
        ref="pdfRef"
        :source="pdfSource"
        :page="page"
        @password-requested="handlePasswordRequest"
        @rendered="handleDocumentRender"
      />
    </div>
  </div>
</template>

<script>
import VuePDF from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
  components: {
    VuePDF
  },
  props: {
    pdfSource: {
      type: String,
      default: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
    }
  },
  data() {
    return {
      isLoading: true,
      page: null,
      pageCount: 1,
      showAllPages: true,
    }
  },
  methods: {
    handleDocumentRender() {
      this.isLoading = false
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    handlePasswordRequest(callback, retry) {
      callback(prompt(retry
        ? 'Enter password again'
        : 'Enter password'
      ))
    }
  }
};
</script>

<style lang="less" scoped>
.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

.app-header {
  padding: 16px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  background-color: #555;
  color: #ddd;
}

.app-content {
  padding: 24px 16px;
}

.right {
  float: right;
}
</style>
