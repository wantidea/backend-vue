import { FirstPrefix } from '@/api/system/system'
import { ApiCrudClass } from '@/api/crud'

class ApiRouteClass extends ApiCrudClass {

}

const prefix = '/' + FirstPrefix + '/route/'
const ApiRoute = new ApiRouteClass(prefix)

export default ApiRoute
