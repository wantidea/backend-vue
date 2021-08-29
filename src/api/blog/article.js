import { ArticlePrefix } from '@/api/blog/blog'
import { ApiCrudClass } from '@/api/crud'

class ApiArticleClass extends ApiCrudClass {
}

const ApiArticle = new ApiArticleClass(ArticlePrefix)

export default ApiArticle
