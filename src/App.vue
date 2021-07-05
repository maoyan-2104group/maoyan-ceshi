<template>
  <div class="container">
  <movies-in-theaters ></movies-in-theaters>
  </div>
</template>

<script>
import  moviesInTheaters from '@v/home/movies/moviesInTheaters.vue'
export default {
  components:{
    moviesInTheaters
  }
//测试一下git
}
</script>

<style lang='stylus' scoped>
.container
  height 100%
</style>
