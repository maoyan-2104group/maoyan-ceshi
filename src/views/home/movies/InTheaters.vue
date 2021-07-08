<template>
  <div><MovieList :hotlist="hotlist"></MovieList></div>
</template>

<script>
//导入封装好的movislist放在这 用来显示的 需要把在movies获取的holist传入给movli
import MovieList from '@c/movie-list/MovieList'
export default {
  props: {
    hotlist: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  components: {
    MovieList,
  },
  methods: {},

  created() {},
}
</script>

<style lang='stylus' scoped></style>
