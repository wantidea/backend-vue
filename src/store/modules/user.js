import { getInfo } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: ''
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
  }
}

const actions = {

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (!res.data.name) {
          return reject('验证失败，请重新登录。')
        }

        commit('SET_NAME', res.data.name)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout() {
    removeToken()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

