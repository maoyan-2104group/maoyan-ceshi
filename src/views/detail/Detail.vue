<template>
  <div>
    <div>详情页</div>
    <button @click="clickhander">返回上一级</button>
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
