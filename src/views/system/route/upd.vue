<template>
  <div class="app-container">
    <el-form ref="updForm" :model="updForm" :rules="rules">
      <el-form-item label="路由名称" prop="name">
        <el-input v-model="updForm.name" />
      </el-form-item>

      <el-form-item label="路由" prop="uri">
        <el-input v-model="updForm.uri" />
      </el-form-item>

      <el-form-item label="请求类型" prop="method">
        <el-input v-model="updForm.method" />
      </el-form-item>

      <el-form-item label="授权角色" prop="role_list">
        <el-input v-model="updForm.role_list" />
      </el-form-item>

      <el-form-item label="是否开启认证" prop="is_auth">
        <el-input v-model="updForm.is_auth" />
      </el-form-item>

      <div class="btn-box">
        <el-button type="primary" @click="submitForm('updForm')">保存</el-button>
        <el-button @click="resetForm('updForm')">重置</el-button>
        <el-button @click="backItem">返回</el-button>
      </div>
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
        uri: '',
        method: '',
        role_list: '',
        is_auth: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入路由名称', trigger: 'blur' }
        ],
        uri: [
          { required: true, message: '请输入路由', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请输入请求类型', trigger: 'blur' }
        ],
        role_list: [
          { required: true, message: '请选择授权角色', trigger: 'blur' }
        ],
        is_auth: [
          { required: true, message: '是否开启认证', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.updForm.id = parseInt(this.$route.query.id || 0)
    if (!this.updForm) {
      this.$router.go(-1)
    } else {
      this.$store.dispatch('systemRoute/item', this.updForm.id).then(res => {
        this.updForm.name = res.data.name
        this.updForm.uri = res.data.uri
        this.updForm.method = res.data.method
        this.updForm.role_list = res.data.role_list
        this.updForm.is_auth = res.data.is_auth
      })
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemRoute/upd', this.updForm)
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
