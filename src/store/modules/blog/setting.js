import ApiSetting from '@/api/blog/setting'

const actions = {
  patch({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiSetting.patchSetting({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getNameItem({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiSetting.getSetting({ ...data }).then(res => {
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

