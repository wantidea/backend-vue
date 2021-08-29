<template>
  <div class="app-container">
    <el-form ref="updForm" class="form-box" :model="updForm" :rules="rules">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="updForm.name" />
      </el-form-item>

      <div class="btn-box">
        <el-button type="primary" @click="submitForm('updForm')">保存</el-button>
        <el-button @click="resetForm('updForm')">重置</el-button>
        <el-button @click="back">返回</el-button>
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
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.updForm.id = parseInt(this.$route.query.id || 0)
    if (!this.updForm) {
      this.$router.go(-1)
    } else {
      this.$store.dispatch('blogArticleCategory/item', this.updForm.id).then(res => {
        this.updForm.name = res.data.name
      })
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('blogArticleCategory/upd', this.updForm)
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
