import ApiArticleCategory from '@/api/blog/article/category'

const actions = {

  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.add({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  del({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.del({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  upd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.item({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.list().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getOption({ commit }) {
    return new Promise((resolve, reject) => {
      ApiArticleCategory.getOption().then(res => {
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
