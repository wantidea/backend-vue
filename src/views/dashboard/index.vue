<template>
  <div class="dashboard-container">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>当前用户</span>
          </div>
          <div class="card-main">
            {{ name }}
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>管理员</span>
          </div>
          <div class="card-main">
            {{ dashboardList.admin_total }} 个
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>角色</span>
          </div>
          <div class="card-main">
            {{ dashboardList.role_total }} 个
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>文章</span>
          </div>
          <div class="card-main">
            {{ dashboardList.article_total }} 篇
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      dashboardList: {
        admin_total: 0,
        role_total: 0,
        article_total: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.getDashboard()
  },
  methods: {
    getDashboard() {
      this.$store.dispatch('systemDashboard/list').then(res => {
        this.dashboardList.admin_total = res.data.admin_total
        this.dashboardList.role_total = res.data.role_total
        this.dashboardList.article_total = res.data.article_total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
