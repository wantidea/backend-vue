import ApiRole from '@/api/system/role'

const mutations = {
  SET_ROLE_OPTION: (state, role_option) => {
    state.role_option = role_option
  }
}

const actions = {
  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiRole.add({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  del({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiRole.del({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  upd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiRole.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiRole.item({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiRole.list().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 读取角色选项
  getOption({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiRole.getOption().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default {
  namespaced: true,
  actions,
  mutations
}

