<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible=true"
    >
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :before-upload="beforeUpload"
        :http-request="function (){}"
        class="editor-slide-upload"
        action=""
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        退出
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'UploadImage',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {}
    }
  },
  methods: {
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      console.log(arr)
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.dialogVisible = false
    },
    beforeUpload(file) {
      const uploadForm = new FormData()
      uploadForm.append('image', file)
      this.$store.dispatch('uploadImage/upload', uploadForm)
        .then(res => {
          this.listObj[file.uid] = { url: res.data.url }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
