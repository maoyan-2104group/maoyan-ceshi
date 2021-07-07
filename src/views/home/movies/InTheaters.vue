<template>
  <!-- 影片信息 -->
  <ul>
    <li v-for="m in hotlist" :key="m.id">
      <div>
        <img :src="m.img | wh" alt="" />
      </div>
      <div>
        <!-- 封装成组件处理显示3dmax还是2dmax -->
        <h1>{{ m.nm }} <movie-vesion :ver="m.ver"></movie-vesion></h1>
        <p>{{ m.cat }}</p>
        <p>{{ m.desc }}</p>
        <div>{{ m.showInfo }}</div>
      </div>
      <!-- 按钮封装成组件处理多少人喜欢和评分以及是否购买预售处理 -->
      <movie-button :movie="m"></movie-button>
    </li>
  </ul>
</template>

<script>
//导入封装button 购票和预售 评分相关的处理组件
import MovieButton from '@c/movie-list/MovieButton'
import MovieVesion from '@c/movie-list/MovieVesion'
export default {
  props: {
    hotlist: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  filters: {
    wh(value) {
      //把wh替换成三倍图
      return value.replace(/w\.h/, '192.270')
    },
  },
  components: {
    MovieButton,
    MovieVesion,
  },
  methods: {},

  created() {},
}
</script>

<style lang='stylus' scoped>
@import '~@a/stylus/border.styl'
@import '~@a/stylus/ellipsis.styl'
ul
  padding-left 0.12rem
  li
    border_1px(0 0 1px 0)
    display flex
    padding 0.12rem 0.12rem 0.12rem 0
    >div:first-child
      width 0.76rem
    >div:nth-child(2)
      flex 1
    img
      width 0.64rem
      height 0.9rem
    h1
      font-size 0.16rem
      ellipsis()
    p
      line-height 0.24rem
      color #666
      &:nth-of-type(2)
        ellipsis()
    div
      line-height 0.24rem
&:last-child
  border_1px(0)
</style>
