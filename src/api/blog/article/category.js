import { ArticleCategoryPrefix } from '@/api/blog/blog'
import { ApiCrudClass } from '@/api/crud'
import request from '@/utils/request'

class ApiArticleCategoryClass extends ApiCrudClass {
  // 菜单选项
  getOption() {
    return request({
      url: this.prefix + 'option',
      method: 'get'
    })
  }
}

const ApiArticleCategory = new ApiArticleCategoryClass(ArticleCategoryPrefix)

export default ApiArticleCategory
