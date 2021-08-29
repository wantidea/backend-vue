<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addItem">添加权限</el-button>
    <el-table
      :data="dataList"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="路由名称"
      />
      <el-table-column
        prop="uri"
        label="路由"
      />
      <el-table-column
        prop="method"
        label="请求类型"
      />
      <el-table-column
        prop="role_list"
        label="授权角色"
      />
      <el-table-column
        prop="is_auth"
        label="是否开启认证"
      />
      <el-table-column
        prop="created_date"
        label="创建时间"
      />
      <el-table-column
        prop="updated_date"
        label="更新时间"
      />
      <el-table-column
        prop="deleted_date"
        label="删除时间"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-link type="warning" class="action-link" @click="upd(scope.row.id)">
            编辑
          </el-link>

          <el-link type="danger" class="action-link" @click="del(scope.row.id)">
            删除
          </el-link>
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
      this.$store.dispatch('systemRoute/list')
        .then(res => {
          this.dataList = res.data
        })
    },
    addItem() {
      this.$router.push('/system/route/add')
    },
    upd(id) {
      this.$router.push({ path: '/system/route/upd?id=' + id })
    },
    del(id) {
      this.$store.dispatch('systemRoute/del', id)
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
    }
  }

}
</script>

<style scoped>
.action-link {
  margin-right: 5px;
}
</style>
