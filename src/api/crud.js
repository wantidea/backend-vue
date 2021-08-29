import request from '@/utils/request'

export class ApiCrudClass {
  constructor(prefix) {
    this.prefix = prefix
  }

  add(data) {
    return request({
      url: this.prefix + 'add',
      method: 'post',
      data
    })
  }

  del(data) {
    return request({
      url: this.prefix + 'del',
      method: 'delete',
      data
    })
  }

  upd(data) {
    return request({
      url: this.prefix + 'upd',
      method: 'put',
      data
    })
  }

  item(data) {
    return request({
      url: this.prefix + 'item',
      method: 'get',
      params: data
    })
  }

  list(data) {
    return request({
      url: this.prefix + 'list',
      method: 'get',
      params: data
    })
  }
}

