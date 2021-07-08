import Vue from 'vue'

//全局过滤器的封装 wh是过滤器的名字，value就是你要过滤的值，args是你传入的参数
Vue.filter('wh', (value, args) => {
    //把wh替换成三倍图
    return value.replace(/w\.h/, args)
})
