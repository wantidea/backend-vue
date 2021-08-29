<template>
  <div class="app-container">
    <div class="article-box">
      <div class="article-left">
        <div class="article-title">{{ item.title }}</div>
        <div v-highlight class="article-content" v-html="item.content" />
        <div class="btn-box-left">
          <el-button type="primary" @click="updItem">编辑</el-button>
          <el-button @click="backItem">返回</el-button>
        </div>
      </div>
      <div class="article-right">
        <div class="btn-box-right">
          <el-button type="primary" @click="updItem">编辑</el-button>
          <el-button @click="backItem">返回</el-button>
        </div>

        <div class="article-right-info">
          <div v-if="item.banner_url" class="article-label">文章横幅图</div>
          <div v-if="item.banner_url" class="article-banner-box">
            <img :src="item.banner_url">
          </div>

          <div class="article-label">分类：{{ item.category_name }}</div>

          <div class="article-look-total">
            浏览数量：{{ item.look_total }}
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'Item',
  data() {
    return {
      item: {
        id: 0,
        title: '',
        content: '',
        look_total: 0,
        banner_url: '',
        category_name: ''
      }
    }
  },
  mounted() {
    this.item.id = parseInt(this.$route.query.id || 0)
    if (!this.item.id) {
      this.$router.go(-1)
    } else {
      this.$store.dispatch('blogArticle/item', this.item.id).then(res => {
        this.item.title = res.data.title
        this.item.content = res.data.content
        this.item.look_total = res.data.look_total
        this.item.banner_url = res.data.banner_url
        this.item.category_name = res.data.category_name
      })
    }
  },
  methods: {
    updItem() {
      this.$router.push('/blog/article/upd?id=' + this.item.id)
    },
    backItem() {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
.article-box {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
}

.article-title {
  font-weight: 600;
  font-size: 26px;
  font-family: "黑体";
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.article-left, .article-right {
  width: 100%;
  padding: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

.btn-box-left {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-box-right {
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.article-right-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #1f2d3d;

  > div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px 0;

    &:last-child {
      border: none;
    }
  }
}

.article-banner-box {
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
}

@media (min-width: 768px) {
  .article-box {
    grid-template-columns: 1fr 350px;
  }
}

</style>

<style>
.article-content p > img {
  max-width: 100%;
}
</style>
