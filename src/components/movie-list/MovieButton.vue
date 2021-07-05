<template>

     <div class="contauner">
            <p v-if="movie.showst===3">{{movie.sc}}<span >分</span></p>
            <!-- shoust是状态 -->
            <p v-if="movie.showst===4">{{movie.wish}}<span >人想看</span> </p>
            <div :class="buttontitle.class">{{buttontitle.title}}</div>
          </div>

</template>

<script>
export default {
    props:{
        movie:Object,
        required:true
    },
  data () {
    return {
    }
  },
  computed:{
    buttontitle(){
      switch (this.movie.showst) {
        case 3:
          return {
            title:'购票',
            class:''
          }
          break;
        case 4:
          return {
            title:'预售',
            class:'pre-sale'
          }
          break;
      }
    }
  },
  methods: {},


}
</script>

<style lang='stylus' scoped>
            .contauner
                width .98rem
                display flex
                flex-direction column
                align-items flex-end
                color #f3ad00
                p 
                  font-size .18rem
                  color #f3ad00
                  margin-bottom .16rem
                  span
                     font-size .12rem
                     transform scale(0.8)
           
                 
                >div
                  width .46rem
                  height .28rem
                  background #dd5042
                  color #fff
                  text-align center
                  line-height .28rem
                  &.pre-sale
                    background #69afe5 
 
</style>
