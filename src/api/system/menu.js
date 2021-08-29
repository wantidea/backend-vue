import request from '@/utils/request'
import { FirstPrefix } from '@/api/system/system'
import { ApiCrudClass } from '@/api/crud'

class ApiMenuClass extends ApiCrudClass {
  // 授权路由
  getAsyncMenu() {
    return request({
      url: prefix + 'async',
      method: 'get'
    })
  }

  // 菜单选项
  getOptionMenu() {
    return request({
      url: prefix + 'option',
      method: 'get'
    })
  }

  // 菜单选项
  getTreeMenu() {
    return request({
      url: prefix + 'treeList',
      method: 'get'
    })
  }

  // 启用或取消认证
  patchIsAuthMenu(data) {
    return request({
      url: prefix + 'isAuth',
      method: 'patch',
      data: data
    })
  }

  // 修改菜单路径
  patchPathMenu(data) {
    return request({
      url: prefix + 'path',
      method: 'patch',
      data: data
    })
  }

  // 修改菜单重定向路径
  patchRedirectAuthMenu(data) {
    return request({
      url: prefix + 'redirect',
      method: 'patch',
      data: data
    })
  }

  // 修改菜单图标
  patchIconMenu(data) {
    return request({
      url: prefix + 'icon',
      method: 'patch',
      data: data
    })
  }

  // 移动菜单
  moveAuthMenu(data) {
    return request({
      url: prefix + 'moveMenu',
      method: 'patch',
      data: data
    })
  }
}

const prefix = '/' + FirstPrefix + '/menu/'
const ApiMenu = new ApiMenuClass(prefix)

export default ApiMenu
