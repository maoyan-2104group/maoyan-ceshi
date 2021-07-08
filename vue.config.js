const path = require('path')   //改了这里的配置需要重启
module.exports = {
    chainWebpack(config) {
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src/'))
            .set('@c', path.resolve(__dirname, './src/components/'))
            .set('@a', path.resolve(__dirname, './src/assets'))
            .set('@u', path.resolve(__dirname, './src/utilis'))
            .set('@v', path.resolve(__dirname, './src/views'))
    },


    //developent server  使用的是webpack developent server启动的 下面是配置webpack这个的
    devServer: {
        open: true, // 自动打开浏览器
        //反向代理 http-proxy-middleware 最底层就是nodejs http协议 nodejs不存在跨域问题
        proxy: {
            //工作原理 如当你请求地址路由的时候，默认的时候是访问本地的网站
            //但你在下面写了暗号/api就会给你拦截了  
            //暗号：当在浏览器地址栏出现/api的字符串的时候
            //http-proxy-middleware会把请求拦下来
            //target就会导向这个目标 当你访问api的时候，前面这个地址就是下面这个地址
            //同时因为地址中并没有/api的路径 所以要路径转发或者重新
            // pathRewrite就可以实现这个功能 会把这个字符替换为空
            '/api': {
                target: 'http://wx.maoyan.com',
                //是否拦截
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            },
            '/upi': {
                target: 'https://m.maoyan.com',
                //是否拦截
                changeOrigin: true,
                pathRewrite: {
                    "^/upi": ''
                }
            },

        }
    }


}