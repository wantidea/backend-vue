import { SettingPrefix } from '@/api/blog/blog'
import request from '@/utils/request'
import { ApiCrudClass } from '@/api/crud'

class ApiSettingClass extends ApiCrudClass {
  // 上传博客名称
  getSetting(data) {
    return request({
      url: this.prefix + 'name',
      method: 'get',
      params: data
    })
  }

  // 上传博客名称
  patchSetting(data) {
    return request({
      url: this.prefix,
      method: 'patch',
      data: data
    })
  }
}

const ApiSetting = new ApiSettingClass(SettingPrefix)

export default ApiSetting
