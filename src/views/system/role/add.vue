<template>
  <div class="app-container">
    <el-form ref="addForm" class="form-box" :model="addForm" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>

      <el-form-item label="角色描述" prop="description">
        <el-input v-model="addForm.description" />
      </el-form-item>

      <div class="btn-box">
        <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button @click="back">返回</el-button>
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
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 30, message: '角色名称长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色密码', trigger: 'blur' },
          { min: 2, max: 100, message: '角色描述长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      role_option: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemRole/add', this.addForm)
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
.form-box {
  width: 100%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 15px;
}
.form-label {
  font-weight: bold;
  color: #2b2f3a;
  margin-bottom: 10px;
}

.btn-box {
  margin-top: 20px;
}
</style>
