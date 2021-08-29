<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addItem">编写文章</el-button>
    <el-button type="primary" size="small" @click="addMdItem">编写 Md 文章</el-button>
    <el-table
      :data="dataList"
      border
      stripe
      class="list-box"
    >
      <el-table-column
        prop="title"
        label="标题"
        min-width="100"
      />
      <el-table-column
        prop="banner_url"
        label="横幅"
      >
        <template slot-scope="scope">
          <img v-if="scope.row.banner_url" :src="scope.row.banner_url" alt="banner_img" class="banner_img">
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作时间"
      >
        <template slot-scope="scope">
          <div>更新：{{ scope.row.updated_date }}</div>
          <div>创建：{{ scope.row.created_date }}</div>
        </template>

      </el-table-column>

      <el-table-column
        prop="category_name"
        label="分类"
      />
      <el-table-column
        prop="look_total"
        label="浏览次数"
      />
      <el-table-column
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top-start">
            <el-button type="primary" icon="el-icon-tickets" size="mini" plain @click="getItem(scope.row.id)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.editor_type===0" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="updItem(scope.row.id)" />
          </el-tooltip>

          <el-tooltip v-else content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="updItemMd(scope.row.id)" />
          </el-tooltip>

          <el-tooltip content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="delItem(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-box">
      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :total="total"
        :page-size="pageSize"
        :page-count="11"
        @current-change="changePage"
      />
    </div>

  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Index',
  data() {
    return {
      dataList: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {},
  mounted() {
    const vm = this
    vm.$nextTick(function() {
      vm.getList(this.page, this.pageSize)
    })
  },
  methods: {
    addItem() {
      this.$router.push('/blog/article/add')
    },
    addMdItem() {
      this.$router.push('/blog/article/addMd')
    },
    changePage(page) {
      const vm = this
      vm.$nextTick(function() {
        vm.getList(page, vm.pageSize)
      })
    },
    getList(page, pageSize) {
      this.$store.dispatch('blogArticle/list', { page: page, page_size: pageSize })
        .then(res => {
          this.dataList = res.data.data
          this.total = res.data.count
        })
    },
    getItem(id) {
      this.$router.push({ path: '/blog/article/item?id=' + id })
    },
    updItem(id) {
      this.$router.push({ path: '/blog/article/upd?id=' + id })
    },
    updItemMd(id) {
      this.$router.push({ path: '/blog/article/updMd?id=' + id })
    },
    delItem(id) {
      const vm = this
      vm.$store.dispatch('blogArticle/del', id)
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          vm.$nextTick(function() {
            vm.getList(vm.page, vm.pageSize)
          })
        })
    }
  }

}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.list-box {
  width: 100%;
  margin-top: 20px;
}

.action-link {
  margin-right: 5px;
}

.banner_img {
  width: 100%;
  height: auto;
}

.pagination-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 30px;
  box-sizing: border-box;
}
</style>
