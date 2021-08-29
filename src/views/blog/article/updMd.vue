<template>
  <div class="app-container">
    <el-form ref="updForm" class="form-box" :model="updForm" :rules="rules">
      <div class="form-box-left">
        <div class="form-label">文章内容</div>
        <div>
          <MarkDownEditor ref="editor" />
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="submitForm('updForm')">保存</el-button>
          <el-button @click="resetForm('updForm')">重置</el-button>
          <el-button @click="back">返回</el-button>
        </div>
      </div>

      <div class="form-box-right">
        <div class="form-label">文章横幅图</div>
        <el-form-item>
          <el-upload
            class="banner-uploader"
            action=""
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="banner">
            <i v-else class="el-icon-plus banner-uploader-icon" />
          </el-upload>
        </el-form-item>

        <div class="form-label">文章标题</div>
        <el-form-item prop="title">
          <el-input v-model="updForm.title" />
        </el-form-item>

        <div class="form-label">分类</div>
        <el-form-item prop="category_id">
          <el-select v-model="updForm.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in categoryOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import MarkDownEditor from '@/components/MarkdownEditor'

export default {
  name: 'Upd',
  components: { MarkDownEditor },
  data() {
    return {
      updForm: {
        title: '',
        content: '',
        content_md: '',
        banner_id: 0,
        category_id: null
      },
      rules: {
        title: [
          { require: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 30, message: '标题长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { require: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      imageForm: new FormData(),
      categoryOption: []
    }
  },
  mounted() {
    this.updForm.id = parseInt(this.$route.query.id || 0)
    if (!this.updForm) {
      this.$router.go(-1)
    } else {
      this.$store.dispatch('blogArticle/item', this.updForm.id).then(res => {
        this.updForm.title = res.data.title
        this.updForm.content = res.data.content
        this.updForm.content_md = res.data.content_md
        this.updForm.banner_id = res.data.banner_id
        this.updForm.category_id = res.data.category_id
        this.imageUrl = res.data.banner_url

        this.$refs.editor.setContentMd(res.data.content_md)
      })
    }

    this.$store.dispatch('blogArticleCategory/getOption').then(res => {
      this.categoryOption = res.data
    })
  },
  methods: {
    submitForm(formName) {
      this.updForm.content = this.$refs.editor.getContentHtml()
      this.updForm.content_md = this.$refs.editor.getContentMd()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('blogArticle/upd', this.updForm)
            .then(res => {
              Message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.back()
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.editor.invoke('reset')
    },
    back() {
      this.$router.go(-1)
    },

    beforeUpload(file) {
      const isPic = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      this.imageForm = new FormData()
      this.imageForm.append('image', file)

      return isPic && isLt2M
    },

    upload() {
      this.$store.dispatch('uploadImage/upload', this.imageForm)
        .then(res => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.imageUrl = res.data.url
          this.updForm.banner_path = res.data.path
          this.updForm.banner_id = res.data.image_id
        })
    }
  }

}
</script>

<style scoped>
.form-box {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
}

.form-label {
  font-weight: bold;
  color: #2b2f3a;
  margin-bottom: 10px;
}

.btn-box {
  margin-top: 20px;
  display: flex;
justify-content: center;
}

.banner-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-uploader:hover {
  border-color: #409EFF;
}

.banner-uploader-icon {
  font-size: 48px;
  color: #8c939d;
}

.banner {
  width: 100%;
  height: auto;
  display: block;
}

.form-box-left, .form-box-right {
  width: 100%;
  padding: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

/deep/ .el-select {
  width: 100%;
}

@media (min-width: 768px) {
  .form-box {
    grid-template-columns: 1fr 350px;
  }
}
</style>
