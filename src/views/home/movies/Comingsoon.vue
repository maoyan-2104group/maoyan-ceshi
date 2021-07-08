<template>
  <!-- 分组需要用 yarn add lodash -->
  <div class="box">
    <div class="most-popular">
      <h1>近期最受欢迎</h1>
      <div id="most-popular">
        <ul>
          <li v-for="(mp, index) in mostPopularList" :key="mp.id + index">
            <h2>
              <img :src="mp.img | wh('192.270')" :alt="mp.nm" />
            </h2>
            <p class="name">{{ mp.nm }}</p>
            <p>{{ mp.wish }}想看</p>
            <p>{{ mp.comingTitle }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="list">
      <div v-for="(value, key) in groupedHotList" :key="key">
        <h1>{{ key }}</h1>
        <MovieList :hotlist="value"></MovieList>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Skeleton } from 'vant'
Vue.use(Skeleton)
//第三方的lodash分组用
import _ from 'lodash'
//导入monent
import moment from 'moment'

//导入移动端滑动
import BScroll from 'better-scroll'
//导入http
import http from '@u/http.js'
import MovieList from '@c/movie-list/MovieList'
//通过view主路由把参数传给了这里 这里在传给公共组件movieList
//分组

export default {
  props: {
    hotlist: {
      type: Array,
    },
  },

  data() {
    return {
      mostPopularList: [],

      loading: true,
    }
  },
  components: {
    MovieList,
  },
  //初始化数据 默认显示四条
  created() {
    this.limit = 4
    this.page = 0
    this.total = 0
  },

  computed: {
    groupedHotList() {
      //这里用了lodash的方法 filter 第一个参数是遍历的集合 第二个是回调函数 第三个参数筛选 这里是判定当这个值为4 1表示没上映的
      //t1就会接受到返回为真值的数组集合，这里就过滤得到数组为真的值
      //遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。
      //predicate（断言函数）调用三个参数：(value, index|key, collection)。
      let t1 = _.filter(this.hotlist, (o) => o.showst === 4 || o.preSale === 1)

      //创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。
      //iteratee 调用 1 个参数： (value)。
      //导入 npm install moment操作时间
      //可以过滤出一个如07月09日 周五: Array(4)}
      let t2 = _.groupBy(t1, (o) => {
        let week =
          '周' + ['日', '一', '二', '三', '四', '五', '六'][moment(o.rt).day()]
        let md = moment(o.rt).format('MM月DD日')
        return md + ' ' + week
      })
      return t2
    },
  },

  async mounted() {
    //这刷新一次的方法
    if (location.href.indexOf('#reloaded') == -1) {
      location.href = location.href + '#reloaded'
      location.reload()
    }

    await this.loadData()

    //BetterScroll
    await this.$nextTick()
    let bs = new BScroll('#most-popular', {
      scrollX: true,
    })

    bs.on('scrollEnd', async (position) => {
      if (this.page * this.limit <= this.total) {
        await this.loadData()
        bs.refresh()
      }
    })
  },
  watch: {
    $rouer() {
      window.location.reload()
    },
  },
  methods: {
    async loadData() {
      let result = await http.get({
        url: '/api/mmdb/movie/v1/list/wish/order/coming.json',
        params: {
          limit: this.limit,
          offset: this.page * this.limit,
          ci: 1,
        },
      })

      this.total = result.data.paging.total

      this.mostPopularList = [...this.mostPopularList, ...result.data.coming]
      this.loading = false
      this.page++
    },
  },
}
</script>

<style lang='stylus' scoped>
@import '~@a/stylus/border.styl'
@import '~@a/stylus/ellipsis.styl'
.box
  background #eee
  width 100%
  top 0
  left 0
  .most-popular
    height 2.3rem
    padding-left 0.15rem
    margin-bottom 0.15rem
    background #fff
    border_1px(0 0 1px 0)
    h1
      height 0.4rem
      font-weight 100
      line-height 0.4rem
    div#most-popular
      overflow hidden
    ul
      display flex
      width max-content
      li
        flex 1
        width 0.8rem
        margin-right 0.3rem
        .name
          color #333
        h2
          img
            width 0.9rem
            height 1.15rem
        h3
          font-weight 100
        p
          color #999
          ellipsis()
  .list
    background #fff
    padding-top 0.1rem
    border_1px(1px 0 0 0)
    h1
      padding-left 0.15rem
      height 0.3rem
      font-weight 100
      line-height 0.3rem
</style>

