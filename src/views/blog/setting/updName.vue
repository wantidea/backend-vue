<template>
  <div class="app-container">
    <el-form ref="updForm" class="form-box" :model="updForm" :rules="rules">
      <el-form-item label="博客名称" prop="value">
        <el-input v-model="updForm.value" />
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
        name: 'name',
        value: ''
      },
      rules: {
        value: [
          { require: true, message: '博客名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$store.dispatch('blogSetting/getNameItem', this.updForm).then(res => {
      this.updForm.value = res.data.value
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
</style>
