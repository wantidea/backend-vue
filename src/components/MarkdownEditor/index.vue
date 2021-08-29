<template>
  <div>
    <editor
      ref="editor"
      :initial-value="editorText"
      :options="editorOptions"
      initial-edit-type="wysiwyg"
      preview-style="vertical"
      :height="1000"
    />

    <input id="uploadBtn" type="file" @change="beforeUpload">
    <input id="uploadMdBtn" type="file" @change="beforeMdUpload">
  </div>

</template>
<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  name: 'MarkdownEditor',
  components: {
    editor: Editor
  },
  data() {
    return {
      editorText: '开始写作吧，少年',
      editorOptions: {
        minHeight: '1000px',
        language: 'zh-CN',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock',
          {
            type: 'button',
            options: {
              el: this.createImageButton(),
              // command: 'addImage',
              tooltip: '上传图片'
            }
          },
          {
            type: 'button',
            options: {
              el: this.createLoadFileButton(),
              tooltip: '读取 Markdown 文档'
            }
          }
        ]
      }
    }
  },
  methods: {
    // 创建上传图片按钮
    createImageButton() {
      const button = document.createElement('button')
      button.className = 'UploadBtn'
      button.innerHTML = `<span>Image</span>`
      button.onclick = function() {
        document.getElementById('uploadBtn').click()
      }
      return button
    },
    // 创建读取文件按钮
    createLoadFileButton() {
      const button = document.createElement('button')
      button.className = 'UploadBtn'
      button.innerHTML = `<span>loadMd</span>`
      button.onclick = function() {
        document.getElementById('uploadMdBtn').click()
      }
      return button
    },
    beforeUpload(e) {
      const files = e.target.files
      if (files && files[0]) {
        const file = files[0]
        // 大小限制 10M
        if (file.size > 1024 * 1024 * 10) {
          return
        }

        const uploadForm = new FormData()
        uploadForm.append('image', file)
        this.$store.dispatch('uploadImage/upload', uploadForm)
          .then(res => {
            const imageMd = '![image](' + res.data.url + ')'
            const contentMd = this.$refs.editor.editor.getMarkdown()
            this.$refs.editor.editor.setMarkdown(contentMd + imageMd)
          })
      }
    },
    beforeMdUpload(e) {
      const vm = this
      const files = e.target.files
      if (files && files[0]) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = function(e) {
          vm.setContentMd(reader.result)
        }
        reader.readAsText(file)
      }
    },
    getContentMd() {
      return this.$refs.editor.editor.getMarkdown()
    },
    getContentHtml() {
      return this.$refs.editor.editor.getHtml()
    },
    setContentMd(mdContent) {
      this.$refs.editor.editor.setMarkdown(mdContent)
    },
    setContentHtml(html) {
      this.$refs.editor.editor.setHtml(html)
    }
  }
}
</script>

<style lang="scss">
.UploadBtn {
  width: 60px !important;

  span {
    color: #2b2f3a;
    font-weight: bold;
  }
}

#uploadBtn,
#uploadMdBtn {
  display: block;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
