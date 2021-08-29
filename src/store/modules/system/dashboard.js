import ApiDashboard from '@/api/system/dashboard'

const actions = {
  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiDashboard.list().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

