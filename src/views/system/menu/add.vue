<template>
  <div class="app-container">
    <el-form ref="addForm" class="form-box" :model="addForm" :rules="rules">
      <el-form-item label="父级菜单" prop="parent_id">
        <el-select v-model="addForm.parent_id" placeholder="请选择父级菜单">
          <el-option
            v-for="item in menuOption"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>

      <el-form-item label="菜单标题" prop="title">
        <el-input v-model="addForm.title" />
      </el-form-item>

      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="addForm.path" />
      </el-form-item>

      <el-form-item label="菜单重定向路径" prop="redirect">
        <el-input v-model="addForm.redirect" />
      </el-form-item>

      <el-form-item label="页面组件" prop="component">
        <el-input v-model="addForm.component" />
      </el-form-item>

      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="addForm.icon" />
      </el-form-item>

      <el-form-item label="菜单排序" prop="sort">
        <el-input v-model="addForm.sort" type="number" />
      </el-form-item>

      <el-form-item label="授权角色" prop="role_list">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="checkedRole" @change="handleCheckedRoleChange">
          <el-checkbox v-for="item in role_option" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="隐藏状态" prop="is_hidden">
        <el-radio v-model="addForm.is_hidden" :label="0">显示</el-radio>
        <el-radio v-model="addForm.is_hidden" :label="1">隐藏</el-radio>
      </el-form-item>

      <el-form-item label="启用认证" prop="is_auth">
        <el-radio v-model="addForm.is_auth" :label="0">不启用</el-radio>
        <el-radio v-model="addForm.is_auth" :label="1">启用</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
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
      addForm: {
        parent_id: 1,
        name: '',
        title: '',
        path: '',
        redirect: '',
        component: '',
        icon: '',
        sort: 255,
        role_list: '',
        is_hidden: 0,
        is_auth: 0
      },
      rules: {
        parent_id: [
          { required: true, message: '父级菜单', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '菜单标题', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '菜单路径', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '页面组件', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '菜单排序', trigger: 'blur' }
        ]
      },
      menuOption: [],

      role_option: [],
      checkedRole: [],

      checkAll: false,
      isIndeterminate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('systemRole/getOption')
        .then(res => {
          this.role_option = res.data
        })

      this.$store.dispatch('systemMenu/getOptionMenu').then(res => {
        this.menuOption = res.data
      })

      this.addForm.parent_id = parseInt(this.$route.query.id || 0)
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.sort = parseInt(this.addForm.sort)
          this.addForm.role_list = this.checkedRole.join(',')
          this.$store.dispatch('systemMenu/add', this.addForm)
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
    },

    handleCheckAllChange(val) {
      this.checkedRole = val ? this.role_option.map(function(v) {
        return v.id
      }) : []
      this.isIndeterminate = false
    },
    handleCheckedRoleChange(value) {
      const checkedList = []
      for (let i = 0; i <= value.length; i++) {
        if (value[i]) {
          checkedList.push(value[i])
        }
      }
      const checkedCount = checkedList.length
      this.checkAll = checkedCount === this.role_option.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.role_option.length
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
