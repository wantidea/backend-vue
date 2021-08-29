<template>
  <div class="app-container">
    <el-upload
      class="banner-uploader"
      action=""
      :http-request="upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"/>
    </el-upload>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Add',
  data() {
    return {
      imageUrl: '',
      imageForm: new FormData()
    }
  },
  methods: {
    beforeUpload(file) {
      const isPic = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      this.imageForm = new FormData()
      this.imageForm.append('image', file)

      return isPic && isLt2M
    },

    upload() {
      this.$store.dispatch('uploadImage/upload', this.imageForm)
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.imageUrl = res.data.url
        })
    }
  }

}
</script>

<style scoped>

.banner-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-uploader:hover {
  border-color: #409EFF;
}

.banner-uploader-icon {
  font-size: 48px;
  color: #8c939d;
}

.banner {
  width: 100%;
  height: auto;
  display: block;
}
</style>
