<template>
  <div class="contauner">
    <p v-if="movie.showst === 3">{{ movie.sc }}<span>分</span></p>
    <!-- shoust是状态 -->
    <p v-if="movie.showst === 4">{{ movie.wish }}<span>人想看</span></p>
    <div :class="buttontitle.class">{{ buttontitle.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    required: true,
  },
  data() {
    return {}
  },
  computed: {
    buttontitle() {
      switch (this.movie.showst) {
        case 3:
          return {
            title: '购票',
            class: '',
          }
          break
        case 4:
          return {
            title: '预售',
            class: 'pre-sale',
          }
          break
      }
    },
  },
  methods: {},
}
</script>

<style lang='stylus' scoped>
.contauner
  width 0.98rem
  display flex
  flex-direction column
  align-items flex-end
  color #f3ad00
  p
    font-size 0.17rem
    color #f3ad00
    margin-bottom 0.16rem
    span
      font-size 0.12rem
      transform scale(0.8)
  >div
    width 0.46rem
    height 0.28rem
    background #dd5042
    color #fff
    text-align center
    line-height 0.28rem
    &.pre-sale
      background #69afe5
</style>
