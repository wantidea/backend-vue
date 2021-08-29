import { FirstPrefix } from '@/api/system/system'
import { ApiCrudClass } from '@/api/crud'
import request from '@/utils/request'

class ApiRoleClass extends ApiCrudClass {
  // 角色选项
  getOption() {
    return request({
      url: this.prefix + 'option',
      method: 'get'
    })
  }
}

const prefix = '/' + FirstPrefix + '/role/'
const ApiRole = new ApiRoleClass(prefix)

export default ApiRole
