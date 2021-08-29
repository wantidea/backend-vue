<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addItem">添加管理员</el-button>
    <el-table
      :data="dataList"
      border
      stripe
      class="list-box"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="role_name"
        label="角色"
      />
      <el-table-column
        label="操作时间"
      >
        <template slot-scope="scope">
          <div>更新：{{ scope.row.updated_date }}</div>
          <div>创建：{{ scope.row.created_date }}</div>
        </template>

      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-tooltip content="重置密码" placement="top-start">
            <el-button type="primary" icon="el-icon-key" size="mini" plain @click="rePwd(scope.row.id)" />
          </el-tooltip>

          <el-tooltip content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="updItem(scope.row.id)" />
          </el-tooltip>

          <el-tooltip content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="delItem(scope.row.id)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Index',
  data() {
    return {
      dataList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('systemAdmin/list')
        .then(res => {
          this.dataList = res.data
        })
    },
    addItem() {
      this.$router.push('/system/admin/add')
    },
    updItem(id) {
      this.$router.push({ path: '/system/admin/upd?id=' + id })
    },
    delItem(id) {
      this.$store.dispatch('systemAdmin/delItem', id)
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$nextTick(function() {
            this.getList()
          })
        })
    },
    rePwd(id) {
      this.$router.push({ path: '/system/admin/rePwd?id=' + id })
    }
  }

}
</script>

<style scoped>
.list-box {
  width: 100%;
  margin-top: 20px;
}

.action-link {
  margin-right: 5px;
}
</style>
