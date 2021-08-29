<template>
  <div class="app-container">
    <el-button type="primary" @click="updAllUrl">更新图片链接</el-button>
    <div class="image-list-box">
      <div
        v-for="item in dataList"
        class="img-box"
      >
        <el-image
          :src="item.url"
          fit="cover"
          :preview-src-list="[item.url]"
          style="width: 100%;height: 100%"
        />
        <div class="copy-box">
          <i class="el-icon-share" title="点击复制链接" @click="copyUrl(item.url)" />
        </div>
      </div>
    </div>
    <div class="footer">
      我也是有底线得
    </div>
    <input id="copy-text">
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      dataList: [],
      page: 1,
      pageSize: 10,
      showBigImgDialog: false,
      bigImgUrl: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getList()
    })

    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    if (windowHeight === scrollHeight) {
      this.$nextTick(function() {
        this.getList()
      })
    }

    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getList() {
      this.$store.dispatch('uploadImage/list', { page: this.page, page_size: this.pageSize })
        .then(res => {
          if (res.data) {
            this.dataList.push.apply(this.dataList, res.data)
          } else {
            this.page--
          }
        })
    },
    updAllUrl() {
      this.$store.dispatch('uploadImage/updAllUrl')
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        this.page++
        this.$nextTick(function() {
          this.getList()
        })
      }
    },
    copyUrl(url) {
      const copyBtn = document.getElementById('copy-text')
      copyBtn.value = url
      copyBtn.select()
      document.execCommand('Copy')
      this.$message('已复制图片链接')
    }
  }

}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
}

.image-list-box {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  grid-template-rows: 200px;
}

@media (min-width: 576px) {
  .image-list-box {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 992px) {
  .image-list-box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 1400px) {
  .image-list-box {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.img-box {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  &:hover {
    .copy-box {
      bottom: 0;
    }
  }
}

.footer {
  width: 100%;
  padding: 45px;
  color: #99a9bf;
  text-align: center;
}

.copy-box {
  position: absolute;
  right: 0;
  bottom: -30px;
  transition: ease-in-out .3s;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;

  width: 100%;
  height: 30px;
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5));
  color: #ffffff;
}

#copy-text {
  display: block;
  width: 20px;
  position: fixed;
  left: -40px;
}
</style>
