<template>
  <div class="app-container">
    <el-form ref="addForm" class="form-box" :model="addForm" :rules="rules">
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>

      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="addForm.password" type="password" />
      </el-form-item>

      <el-form-item label="管理员角色" prop="role_id">
        <el-select v-model="addForm.role_id" placeholder="请选择">
          <el-option
            v-for="item in role_option"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
        password: '',
        role_id: null
      },
      rules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 20, message: '管理员名称长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' },
          { min: 8, max: 100, message: '管理员密码长度最少为 8 个字符', trigger: 'blur' }
        ]
      },
      role_option: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('systemRole/getOption')
        .then(res => {
          this.role_option = res.data
        })
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('systemAdmin/add', this.addForm)
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

.btn-box {
  margin-top: 20px;
}
</style>
