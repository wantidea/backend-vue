import ApiRoute from '@/api/system/route'

const actions = {
  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiRoute.add({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  del({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiRoute.del({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  upd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ApiRoute.upd({ ...data }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  item({ commit }, id) {
    return new Promise((resolve, reject) => {
      ApiRoute.item({ id: id }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  list({ commit }) {
    return new Promise((resolve, reject) => {
      ApiRoute.list().then(res => {
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

