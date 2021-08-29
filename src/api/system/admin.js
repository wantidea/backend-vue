import request from '@/utils/request'
import { FirstPrefix } from '@/api/system/system'
import { ApiCrudClass } from '@/api/crud'

class ApiAdminClass extends ApiCrudClass {
  // 管理员登录
  login(data) {
    return request({
      url: prefix + 'login',
      method: 'post',
      data
    })
  }

  // 管理员信息
  getInfo() {
    return request({
      url: prefix + 'info',
      method: 'get'
    })
  }

  // 重置密码
  rePwd(data) {
    return request({
      url: prefix + 'rePwd',
      method: 'patch',
      data
    })
  }
}

const prefix = '/' + FirstPrefix + '/admin/'
const ApiAdmin = new ApiAdminClass(prefix)

export default ApiAdmin
