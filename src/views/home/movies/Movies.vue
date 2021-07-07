<template>
  <!-- 导航条 -->
  <!-- van-pull-refresh 用于上啦刷新 van-list用于下拉刷新 -->
  <van-pull-refresh v-model="refreshing" @refresh="onrefrech">
    <van-list
      v-model="loading"
      @load="onload"
      :finished="finished"
      finished-text="大兄弟别滑了 已经到底了"
    >
      <main>
        <nav>
          <!--  1.<router-link tag="div" to="/city">或者点击的时候让他调到city里面的去用push -->
          <div @click="clickhander">
            北京
            <i class="city-entry-arrow"></i>
          </div>
          <div>
            <ul>
              <!-- 在这里还有一层子路由要显示的 下面挂载 -->
              <router-link tag="li" to="/movie/inTheaters" active-class="active"
                >热映</router-link
              >
              <router-link tag="li" to="/movie/comingsoon" active-class="active"
                >待映</router-link
              >
            </ul>
          </div>
          <div></div>
        </nav>
        <!-- 这里挂载的是待映和热映子路由的 同时需要把这里获取到了的hotlist传入 哪里挂载了router-view哪里就有子路由 -->
        <router-view :hotlist="hotlist"></router-view>
      </main>
    </van-list>
  </van-pull-refresh>
</template>

<script>
//导入vant 库  list和pullrefresh也需要导入进来   yarn add babel-plugin-import --dev
import Vue from 'vue'
import { List, PullRefresh } from 'vant'
Vue.use(List)
Vue.use(PullRefresh)
//导入封装的axos
import http from '@u/http'

export default {
  data() {
    return {
      hotlist: [], //前端传来的数据
      loading: false, //是否处于加载状态，加载过程中不触发load事件
      finished: false, //	是否已加载完成，加载完成后不再触发load事件
      refreshing: false, //上来是没有这个效果的 用户下拉的时候是true
    }
  },
  created() {
    //初始化的数据
    this.limit = 12
    this.page = 0
    this.ct = '珠海'
  },

  methods: {
    async LoadDate() {
      //如果用户下啦 那么page页码重置为0
      //  if (this.refreshing) {
      //    this.hotlist=[]
      //     this.page=0
      //  }

      let result = await http.get({
        url: '/api/mmdb/movie/v2/list/hot.json',
        //下面是初始化的变量  limit是一次多少条数据  offset每次分页的页码 起始点
        params: {
          limit: this.limit,
          offset: this.page * this.limit,
          ct: this.ct,
        },
      })

      //返回的就是之前的和现在的拼接在一起 那么可以用展开运算符复制 因为他是个数组返回的push就会二维数组
      this.hotlist = [...this.hotlist, ...result.hot]
      this.loading = false
      this.page++
      //总页数/页数(12) 可以翻页的页数
      //当当前页码大于等于翻页的页数 就不触发onload也就是请求数据了
      if (this.page >= Math.ceil(result.total / this.limit)) {
        this.finished = true
      }
    },

    //每次拉就会执行下面这个函数 以前的数据需要和我之前的数据拼一起 onload会自动做一次请求数据的
    onload() {
      this.LoadDate()
    },
    onrefrech() {
      this.LoadDate()
      //一拉的时候会变成true 所以变成false
      this.refreshing = false
    },
    //点击后进入city
    clickhander() {
      this.$router.push('/city')
    },
  },
}
</script>

<style lang='stylus' scoped>
@import '~@a/stylus/border.styl'
@import '~@a/stylus/ellipsis.styl'
main
  // 导航条 城市 热映 待映
  nav
    border_1px(0 0 1px 0)
    display flex
    > div:first-child
      display flex
      justify-content center
      align-items center
      width 0.7rem
      color #999
      .city-entry-arrow
        width 0
        height 0
        border 0.04rem solid #b0b0b0
        border-left-color transparent
        border-right-color transparent
        border-bottom-color transparent
        display inline-block
        margin-left 0.04rem
        margin-top 0.05rem
        color #aaa
    > div:nth-child(2)
      flex 1
      ul
        padding-left 0.3rem
        padding-right 0.5rem
        display flex
        li
          position relative
          flex 1
          line-height 0.44rem
          text-align center
          font-size 0.14rem
          color #666
          &.active
            color red
            &::after
              content ''
              width 0.4rem
              position absolute
              left 50%
              transform translate(-50%, 0)
              bottom 0
              border-bottom 0.02rem solid red
              // 搜索框的样式
    > div:last-child
      border_1px(0 0 0 1px)
      width 0.44rem
      height 0.44rem
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABC1JREFUWAntWEtrU1EQPpO+ArYm1Y1I3VRXgu5EoSpVQaxCxUVxYTeCv8CtoFVxW0F/gBsLiguxoBaxWHyLS0EEdWWobrRprZC+cpzv3NyTOfeR3DS3duOF5M6ZMzPflzmvOVHq/9NcBqhRdz001D43UziktR5k35382ao1bUUcIj3NL3w+EtH4xu6eZ3Tv3iL6VvskJjh/vH/Lcql0UZM6o7TamAiQ1BxpNdaazV7pfDT1I5FPwKguQT0w0FFcLF5QSp9nYhsC/smapP5wfkfz7flr9PjxQjInz6omQZO1hdJ9rdW+RoLG2RKpt60d2VONZDOW4PyRA7uX9NJDBuuJACzwhHuQ0ZmHPNe+dm1qxbxTv38t83zU28tUPqG0Phnn25ah451P33yIiBtSRRJE5pZKpfchAKJp0vpSbvO2Wzz5V0LRhIIXU8vsz29nNdFlJmsWkegutGWze5JkMkQQc252cWYqYljH850twzT+6rcAqivqwb6u4vzKbTbEqrcPhjvX3t1fb05mrEdFwIIIkSN1I3/w2KlGySEkfOCrVOamxAKGt/ikNiw7GTRDu1D6Elit44bcyEg57J5co0dGMsXnE/fZo5pJXt1tHdkdtYbaySD2OYcczzkzrE2Sw88gjoFYvLjMgjI/jbctg2ka0V+WIE4IswkLOyyI1QyrCOGIiIWYUglMYEudlC1BHF+BE6KA1SqN05ArMQs2Fp9KBtsqXMESrJyt1V7e5+ptJVXj5JKJybGlRwhbdFqCrMPBbx9swraRshAR28GWcJKgs5nihJCGacoRsR1siWUJ+iWT3+kfX347zXcwdhBbYlmCUrkOso7DtAQrxaa1w8FvGykLwdiM/T0OwhJkg+oGyg1UJXFOzeojYjvYMr4k+FF2mJJJKlKUI2I72BLKEsQdQnagnkPJ5OhSaJiYXq1oo4WwbQ+XGL6MC47iO4Tf5ncP6jnRTkWsxKwWwYxpsGOiW4K4feGCI+1QbKKek7pmZMQyBawIAkxgC5UjWoLQ4vbFWeQLTuXhShjFJkolX7Xatym3ULjK6pqxDGaNoA6wV5fRaMB+sPhi4nozJL1a8IlbCxoQGq1VC8LEKVih+Icl/2cu+Xc1XPLDAVdD5loticCcK+Hin/Kn4uF955KsbtjAFj7wNRGcL+qdW5wFTs0nlEHfeg2vnT4EF9e0QoqGc5Ov71hlQIglCLs1uLh/5lnVyyeJ3V9Bkne7M/nJV3cD3EzTWSRBA0xgXA35p151VnfQsF4bOwPHwJwDGY+U5+SRLY8Vj/SdjgpTM4PSwWQzpT+PPDLlsSSZTEzQJ8uTP5W/35KSbJigTzSNdxxJamnpyz15+Q4YNedgGiRqxfAWRnhO6pWy3ZbWlSDIR5EkpV/4P2xdh9gngffs0f17kTmQy02+mZB9/+VmMvAXE7/38O8tTYkAAAAASUVORK5CYII=') no-repeat
      background-size 0.2rem
      padding 0.1rem 0.15rem 0.1rem 0.1rem
      background-position 0.1rem
</style>
