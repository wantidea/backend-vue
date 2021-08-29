import request from '@/utils/request'
import { FirstPrefix } from '@/api/system/system'
import { ApiCrudClass } from '@/api/crud'

class ApiDashboardClass extends ApiCrudClass {
  // 仪表台信息
  list() {
    return request({
      url: prefix + 'list',
      method: 'get'
    })
  }
}

const prefix = '/' + FirstPrefix + '/dashboard/'
const ApiDashboard = new ApiDashboardClass(prefix)

export default ApiDashboard
