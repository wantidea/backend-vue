import ApiArticle from '@/api/blog/article'

const actions = {

  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiArticle.add({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  del({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiArticle.del({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  upd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiArticle.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiArticle.item({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  list({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiArticle.list(data).then(res => {
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
