<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addItem">添加角色</el-button>
    <el-table
      :data="dataList"
      border
      stripe
      class="list-box"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="角色名称"
      />
      <el-table-column
        prop="description"
        label="角色描述"
        ww
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
        label="操作"
      >
        <template slot-scope="scope">

          <el-tooltip content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="upd(scope.row.id)" />
          </el-tooltip>

          <el-tooltip content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="del(scope.row.id)" />
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
      this.$store.dispatch('systemRole/list')
        .then(res => {
          this.dataList = res.data
        })
    },
    addItem() {
      this.$router.push('/system/role/add')
    },
    upd(id) {
      this.$router.push({ path: '/system/role/upd?id=' + id })
    },
    del(id) {
      this.$store.dispatch('systemRole/del', id)
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
.list-box {
  width: 100%;
  margin-top: 20px;
}

.action-link {
  margin-right: 5px;
}
</style>
