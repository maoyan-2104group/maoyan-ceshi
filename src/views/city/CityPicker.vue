<template>
  <div>
    <div>城市选择</div>
    <button @click="clickhander">返回我的主页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    clickhander() {
      this.$router.push('/movie')
    },
  },

  created() {},
}
</script>

<style lang='less' scoped>
</style>
