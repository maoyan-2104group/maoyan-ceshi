//是我们这个程序的入门 因为装了脚手架 webpa 就自动读取main.js文件 不能改名

import Vue from 'vue'
import App from './App.vue'
import router from "./router"
//屏蔽关于生产环境的提示
Vue.config.productionTip = false

//引入全局样式
import '@a/reset.css'

//引入全局过滤器
import './filters/filters'
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
