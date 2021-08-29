<template>
  <div class="app-container">
    <el-form ref="addForm" :model="addForm" :rules="rules">
      <el-form-item label="路由名称" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>

      <el-form-item label="路由" prop="uri">
        <el-input v-model="addForm.uri" />
      </el-form-item>

      <el-form-item label="请求类型" prop="method">
        <el-input v-model="addForm.method" />
      </el-form-item>

      <el-form-item label="授权角色" prop="role_list">
        <el-input v-model="addForm.role_list" />
      </el-form-item>

      <el-form-item label="是否开启认证" prop="is_auth">
        <el-input v-model="addForm.is_auth" />
      </el-form-item>

      <div class="btn-box">
        <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button @click="backItem">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Add',
  data() {
    return {
      addForm: {
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemRoute/add', this.addForm)
            .then(res => {
              Message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.$router.push('/system/role/index')
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    backItem() {
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
.form-label {
  font-weight: bold;
  color: #2b2f3a;
  margin-bottom: 10px;
}

.btn-box {
  margin-top: 20px;
}
</style>
