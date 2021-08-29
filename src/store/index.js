import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import pub from '@/store/modules/public'
import systemDashboard from '@/store/modules/system/dashboard'
import systemAdmin from '@/store/modules/system/admin'
import systemMenu from '@/store/modules/system/menu'
import systemRole from '@/store/modules/system/role'
import systemRoute from '@/store/modules/system/route'
import blogArticle from '@/store/modules/blog/article'
import blogArticleCategory from '@/store/modules/blog/article/category'
import blogSetting from '@/store/modules/blog/setting'
import uploadImage from '@/store/modules/upload/image'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    pub,
    systemAdmin,
    systemMenu,
    systemRole,
    systemRoute,
    blogArticle,
    uploadImage,
    blogSetting,
    blogArticleCategory,
    systemDashboard
  },
  getters
})

export default store
