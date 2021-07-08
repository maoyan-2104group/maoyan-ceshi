<template>
  <div>
    <div>详情页</div>
    <button @click="clickhander">返回上一级</button>
  </div>
</template>

<script>
//导入封装的axos
import http from '@u/http'
export default {
  data() {
    return {}
  },

  methods: {
    clickhander() {
      this.$router.push('/movie')
    },
    //获取商品详情
    async LoadDate() {
      let result = await http.get({
        url: '/upi/ajax/detailmovie',
        params: {
          movieId: 1203734, //这里传入点击时候获取的id
        },
      })
      //这就是你要的数据
      console.log(result.detailMovie)
    },
  },

  created() {},
  mounted() {
    this.LoadDate()
  },
}
</script>

<style lang='stylus' scoped></style>
