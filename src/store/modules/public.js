import { login } from '@/api/public'
import { setToken } from '@/utils/auth'

const actions = {
  login({ commit }, userInfo) {
    const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password }).then(response => {
        const { data } = response
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

