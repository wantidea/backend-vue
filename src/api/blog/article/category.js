import { ArticleCategoryPrefix } from '@/api/blog/blog'
import { ApiCrudClass } from '@/api/crud'
import request from '@/utils/request'

class ApiArticleCategoryClass extends ApiCrudClass {
  // ่ๅ้้กน
  getOption() {
    return request({
      url: this.prefix + 'option',
      method: 'get'
    })
  }
}

const ApiArticleCategory = new ApiArticleCategoryClass(ArticleCategoryPrefix)

export default ApiArticleCategory
