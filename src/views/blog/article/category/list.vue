<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addItem">添加分类</el-button>
    <el-table
      border
      stripe
      :data="dataList"
      class="list-box"
    >
      <el-table-column
        prop="id"
        label="ID"
      />

      <el-table-column
        prop="name"
        label="分类名称"
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
      this.$store.dispatch('blogArticleCategory/list')
        .then(res => {
          this.dataList = res.data
        })
    },
    addItem() {
      this.$router.push('/blog/article/category/add')
    },
    upd(id) {
      this.$router.push({ path: '/blog/article/category/upd?id=' + id })
    },
    del(id) {
      this.$store.dispatch('blogArticleCategory/del', id)
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

</style>
