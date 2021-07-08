<template>
  <div>
    <div class="most-popular">
      <h1>近期最受欢迎</h1>
      <ul>
        <li>
          <h2>
            <img
              src="https://p1.meituan.net/movie/6876f0a4db61cab652fdc3d3ed14e94c4924473.jpg@1l_1e_1c_128w_180h"
              alt=""
            />
          </h2>
          <p>中国医生</p>
          <p>10000人想看</p>
          <p>10月一日</p>
        </li>
      </ul>
    </div>
    <ul>
      <li>list</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {},

  created() {},
}
</script>

<style lang='stylus' scoped>
.most-popular
  heigth 2.3rem
  padding-left 0.15rem
  h1
    height 0.4rem
    font-weight 100
  ul
    li
      h2
        img
          width 0.8rem
          height 1.15rem
</style>
