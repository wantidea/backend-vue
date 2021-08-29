import { constantRoutes } from '@/router'
import ApiMenu from '@/api/system/menu'
import router from '@/router'

const state = {
  routers: constantRoutes,
  addRouters: []
}

const mutations = {
  SET_ASYNC_MENU: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
    router.addRoutes(routers)
  }
}

const actions = {
  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.add({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  del({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiMenu.del({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  upd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiMenu.item({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiMenu.list().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  treeList({ commit }) {
    return new Promise((resolve, reject) => {
      ApiMenu.getTreeMenu().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 动态路由菜单
  getAsyncMenu({ commit }) {
    return new Promise((resolve, reject) => {
      ApiMenu.getAsyncMenu().then(res => {
        const accessRouters = filterAsyncRouter(res.data)
        commit('SET_ASYNC_MENU', accessRouters)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 菜单选项
  getOptionMenu({ commit }) {
    return new Promise((resolve, reject) => {
      ApiMenu.getOptionMenu().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 启用或取消认证
  patchIsAuthMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.patchIsAuthMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改菜单路径
  patchPathMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.patchPathMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改菜单重定向路径
  patchRedirectMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.patchRedirectMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改菜单图标
  patchIconMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.patchIconMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移动菜单
  moveAuthMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiMenu.moveAuthMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

function _import(component) {
  return res => require([`@/${component}`], res)
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    delete route.id
    delete route.parent_id
    delete route.level
    delete route.role_list
    delete route.sort
    delete route.is_auth

    if (!route.redirect) {
      delete route.redirect
    }

    route.hidden = route.is_hidden
    delete route.is_hidden

    if (!route.children) {
      delete route.children
    }

    if (route.title || route.icon) {
      route.meta = {}
      if (route.title) {
        route.meta.title = route.title
        delete route.title
      }
      if (route.icon) {
        route.meta.icon = route.icon
        delete route.icon
      }
    }

    if (route.component) {
      route.component = _import(route.component)
    } else {
      delete route.component
    }

    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

