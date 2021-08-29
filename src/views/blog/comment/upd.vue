<template>
  <div class="app-container">
    <el-form ref="updForm" :model="updForm" :rules="rules">
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="updForm.name" />
      </el-form-item>
      <el-form-item label="管理员角色" prop="role_id">
        <el-input v-model="updForm.role_id" />
      </el-form-item>

      <el-form-item label="管理员头像" prop="avatar_path">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
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
  name: 'Upd',
  data() {
    return {
      updForm: {
        id: 0,
        name: '',
        role_id: 0,
        avatar_path: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 20, message: '名称长度在 3 到 20 个字符', trigger: 'blur' }
        ]
        // role_id: [
        //   { require: true, message: '请选择角色', trigger: 'blur' }
        // ]
      },
      imageUrl: '',
      imageForm: new FormData()
    }
  },
  mounted() {
    this.updForm.id = parseInt(this.$route.query.id || 0)
    if (!this.updForm) {
      this.$router.go(-1)
    } else {
      this.$store.dispatch('systemAdmin/item', this.updForm.id).then(res => {
        this.updForm.name = res.data.name
        this.updForm.role_id = res.data.role_id
        this.updForm.avatar_path = res.data.avatar_path
        this.imageUrl = res.data.avatar_url
      })
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemAdmin/updItem', this.updForm)
            .then(res => {
              Message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
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
          this.updForm.avatar_path = res.data.path
        })
    },
    back() {
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
