<template>
  <div class="app-container">
    <!--    <el-button type="primary" size="small" @click="add()">添加菜单</el-button>-->

    <el-tree
      v-loading.fullscreen.lock="loading"
      node-key="id"
      class="tree-box"
      :data="dataList"
      :expand-on-click-node="false"
      draggable
      default-expand-all
      @node-drop="handleDrop"
    >
      <div slot-scope="{ node, data }" class="custom-tree-node tree-item">
        <div class="tree-item-info">
          <div v-if="data.icon">
            <i v-if="data.icon" :class="data.icon" class="tree-item-icon" />
          </div>

          <div v-if="data.title">
            <span>{{ data.title }}</span>
          </div>
        </div>

        <div class="tree-item-action-box">

          <el-tooltip class="item" effect="dark" :content="'路径：' + data.path" placement="top-start">
            <el-input v-model="data.path" size="mini" class="menu-path-box" placeholder="请输入路径">
              <template slot="append"><i class="el-icon-check menu-path-btn" @click="patchPath(data.id,data.path)" />
              </template>
            </el-input>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            :content="'重定向路径：' + (data.redirect ? data.redirect : '无')"
            placement="top-start"
          >
            <el-input v-model="data.redirect" size="mini" class="menu-redirect-box" placeholder="无">
              <template slot="append"><i
                class="el-icon-check menu-redirect-btn"
                @click="patchRedirect(data.id,data.redirect)"
              />
              </template>
            </el-input>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :content="'图标：' + (data.icon ? data.icon : '无')" placement="top-start">
            <el-input v-model="data.icon" size="mini" class="menu-icon-box" placeholder="无">
              <template slot="append"><i class="el-icon-check menu-icon-btn" @click="patchIcon(data.id,data.icon)" />
              </template>
            </el-input>
          </el-tooltip>

          <span v-if="data.is_hidden" class="menu-hidden-box menu-hidden">隐藏</span>
          <span v-else class="menu-hidden-box menu-show">显示</span>

          <span class="menu-hidden-box menu-show">排序：{{ data.sort }}</span>

          <el-tooltip
            class="menu-auth-box"
            effect="dark"
            :content="data.is_auth ? '启用认证' : '不启用'"
            placement="top-start"
          >
            <el-switch
              v-model="data.is_auth"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="patchIsAuth(data.id,data.is_auth)"
            />
          </el-tooltip>

        </div>

        <div class="tree-item-button-box">

          <el-tooltip class="item" effect="dark" content="添加子菜单" placement="top-start">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="add(data.id)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="upd(data.id)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="del(data.id)" />
          </el-tooltip>
        </div>

        <!--        <span>排序：{{ data.sort }}</span>-->
        <!--        <span> | </span>-->
      </div>
    </el-tree>

  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Index',
  data() {
    return {
      dataList: [],
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('systemMenu/treeList')
        .then(res => {
          this.dataList = res.data
        })
    },
    add(id = 0) {
      if (id === 0) {
        this.$router.push('/system/menu/add')
      } else {
        this.$router.push('/system/menu/add?id=' + id)
      }
    },
    upd(id) {
      this.$router.push({ path: '/system/menu/upd?id=' + id })
    },
    patchIsAuth(id, value) {
      this.loading = true
      if (value) {
        value = 1
      } else {
        value = 0
      }
      this.$store.dispatch('systemMenu/patchIsAuthMenu', { id: id, is_auth: value })
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$nextTick(function() {
            this.getList()
            this.loading = false
          })
        })
    },
    patchRedirect(id, value) {
      this.loading = true
      this.$store.dispatch('systemMenu/patchRedirectMenu', { id: id, redirect: value })
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$nextTick(function() {
            this.getList()
            this.loading = false
          })
        })
    },
    patchIcon(id, value) {
      this.loading = true
      this.$store.dispatch('systemMenu/patchIconMenu', { id: id, icon: value })
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$nextTick(function() {
            this.getList()
            this.loading = false
          })
        })
    },
    patchPath(id, value) {
      this.loading = true
      this.$store.dispatch('systemMenu/patchPathMenu', { id: id, path: value })
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$nextTick(function() {
            this.getList()
            this.loading = false
          })
        })
    },
    del(id) {
      this.$store.dispatch('systemMenu/del', id)
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

    // 移动菜单
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.loading = true
      const menuId = draggingNode.data.id
      const endMenuId = dropNode.data.id
      if (!menuId || !endMenuId) {
        return
      }

      this.$store.dispatch('systemMenu/moveAuthMenu', {
        id: menuId,
        end_id: endMenuId,
        position: dropType
      }).then(res => {
        this.$nextTick(function() {
          this.getList()
          this.loading = false
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.tree-item {
  width: 100%;
}

.tree-item-icon {
  margin-right: 5px;
}

.tree-item-info {
  display: flex;
  align-items: center;
}

.menu-hidden-box {
  margin-left: 50px;
}

.menu-show, .menu-hidden {
  font-size: 14px;
}

.menu-show {
  color: green;
}

.menu-hidden {
  color: red;
}

.menu-path-box:first-child {
  margin-left: 0;
}

.menu-auth-box {
  margin-left: 50px;
}

.menu-path-box,
.menu-redirect-box,
.menu-icon-box {
  margin-left: 50px;
  width: 200px;
}

.menu-path-btn,
.menu-redirect-btn,
.menu-icon-btn {

  &:hover {
    color: green;
    font-size: 15px;
    font-weight: bold;
  }
}

</style>

<style scoped>

/deep/ .el-tree-node__content {
  height: 50px;
}

/deep/ .el-tree-node__children {
  padding-left: 30px;
  background: rgba(255, 255, 255, 1);
}

/deep/ .el-tree-node__children .el-tree-node__children {
  background: rgba(240, 240, 240, 1);
}

/deep/ .tree-item {
  display: grid;
  grid-template-columns: 150px 2fr auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

/deep/ .menu-path-box .el-input-group__append,
/deep/ .menu-redirect-box .el-input-group__append,
/deep/ .menu-icon-box .el-input-group__append {
  padding: 0 10px;
}

</style>

