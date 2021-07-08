import axios from 'axios'
axios.defaults.timeout = 5000

//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'token': localStorage.getItem('token') // 获取token缓存
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export default {
    /**
     * 封装get方法
     * @param url
     * @param data
     * @returns {Promise}
     */
    //下面要解构url和paranms  因为axious传过来的是一个对象 那么url就变成了改对象 params就一个空数组 这样就会请求一个空数组
    get: function ({ url, params = {} }) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)

                })
        })
    },
    /**
     * 封装post请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    post: function (url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(response => {
                    resolve(response.data)
                }, err => {
                    reject(err)
                })
        })
    }
}


// import axios from 'axios'

// const get = ({ url, params }) => {
//     return axios({
//         url,
//         params
//     })
//         .then(result => {
//             //这里还要返回数据给前端
//             return result.data.data
//         })
//         .catch(e => {

//             return e
//         })
// }


