<template>
  <div class="app-container">
    <el-form ref="patchForm" class="form-box" :model="patchForm" :rules="rules">
      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="patchForm.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('patchForm')">保存</el-button>
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
      patchForm: {
        id: 0,
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' },
          { min: 8, max: 100, message: '管理员密码长度最少为 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.patchForm.id = parseInt(this.$route.query.id || 0)
    if (!this.patchForm.id) {
      this.$router.go(-1)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemAdmin/rePwd', this.patchForm)
            .then(res => {
              Message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.$router.go(-1)
            })
        }
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
