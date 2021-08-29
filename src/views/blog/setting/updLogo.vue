<template>
  <div class="app-container">
    <el-form ref="updForm" class="form-box" :model="updForm" :rules="rules">
      <el-form-item label="博客 logo" prop="logo_path">
        <el-upload
          class="logo-uploader"
          action=""
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="logo" alt="logo">
          <i v-else class="el-icon-plus logo-uploader-icon" />
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('updForm')">保存</el-button>
        <el-button @click="resetForm('updForm')">重置</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'UpdLogo',
  data() {
    return {
      updForm: {
        name: 'logo',
        value: ''
      },
      rules: {
        value: [
          { require: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      imageForm: new FormData()
    }
  },
  mounted() {
    this.$store.dispatch('blogSetting/getNameItem', this.updForm).then(res => {
      this.updForm.value = res.data.value
      this.imageUrl = res.data.logo_url
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('blogSetting/patch', this.updForm)
            .then(res => {
              Message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.back()
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    beforeAvatarUpload(file) {
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
          this.updForm.value = res.data.path
        })
    },
    back() {
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
.form-box {
  width: 100%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 15px;
}
.logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.logo-uploader .el-upload:hover {
  border-color: #409EFF;
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.logo {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
