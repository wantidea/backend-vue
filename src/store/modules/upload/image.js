import ApiImage from '@/api/upload/image'

const actions = {

  // 文件上传
  upload({ commit }, formData) {
    return new Promise((resolve, reject) => {
      ApiImage.upload(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 图床列表
  list({ commit }, formData) {
    return new Promise((resolve, reject) => {
      ApiImage.list(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 图床列表
  updAllUrl({ commit }, formData) {
    return new Promise((resolve, reject) => {
      ApiImage.updAllUrl(formData).then(response => {
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

