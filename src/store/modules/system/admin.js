import { getToken, setToken } from '@/utils/auth'
import ApiAdmin from '@/api/system/admin'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar_url: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {

  // 管理员登录
  login({ commit }, adminInfo) {
    const { name, password } = adminInfo
    return new Promise((resolve, reject) => {
      ApiAdmin.login({ name: name.trim(), password: password }).then(response => {
        const { data } = response
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 管理员信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      ApiAdmin.getInfo().then(res => {
        const { data } = res
        if (!data.name) {
          return reject('验证失败，请重新登录。')
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar_url)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 添加管理员
  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAdmin.add({
        name: data.name,
        password: data.password,
        role_id: data.role_id
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除管理员
  delItem({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiAdmin.del({ id: id }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改管理员
  updItem({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAdmin.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 管理员详情
  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiAdmin.item({ id: id }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 管理员列表
  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiAdmin.list().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改管理员
  rePwd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiAdmin.rePwd(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}

