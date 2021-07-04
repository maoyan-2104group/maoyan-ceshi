module.exports = {

    devServer: {
        proxy: {
            //暗号：当在浏览器地址栏出现/api的字符串的时候
            //heep-proxy-middleware会把请求拦下来
            '/api': {
                target: 'http://wx.maoyan.com',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            },

        }
    }
}