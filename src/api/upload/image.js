import request from '@/utils/request'
import { ImagePrefix } from '@/api/upload/upload'
import { ApiCrudClass } from '@/api/crud'

class ApiImageClass extends ApiCrudClass {
  // 上传图片
  upload(data) {
    return request({
      url: this.prefix + 'upload',
      method: 'post',
      data
    })
  }

  // 上传图片
  updAllUrl(data) {
    return request({
      url: this.prefix + 'allUrl',
      method: 'put',
      data
    })
  }
}

const ApiImage = new ApiImageClass(ImagePrefix)

export default ApiImage
