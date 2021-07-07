//导入vue和路由插件
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)
import Home from "@v/home/Home"
//定义路由home和city是最外层的路由 home里面有三个tab city还有城市 一级路由还有详情页 等
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: "/movie",
        children: [
            {
                path: 'movie',
                name: "movie",
                component: () => import(/* webpackChuckName:'movie' */'@v/home/movies/Movies'),
                redirect: "/movie/inTheaters",
                children: [
                    {
                        path: 'inTheaters',
                        name: 'inTheaters',
                        component: () => import(/* webpackChuckName:'inTheaters */'@v/home/movies/InTheaters'),

                    }, {
                        path: 'comingsoon',
                        name: 'comingsoon',
                        component: () => import(/* webpackChuckName:'comingsoon */'@v/home/movies/Comingsoon.vue'),
                    }
                ],

            }, {
                path: 'theaters',
                name: 'theaters',
                component: () => import(/* webpackChuckName:'theates' */'@v/home/theaters/Theates')
            }, {
                path: 'profile',
                name: 'profile',
                component: () => import(/* webpackChuckName:'profile' */'@v/home/profile/Profile')

            }
        ]
    },
    {
        path: '/city',
        name: 'city',
        //这里的city是可以异步加载 点一下在加载 improt实际上是一个promise 把下面这个打包成一个单独的文件 切换路由才加载 下面是魔法注释这是优化
        component: () => import(/* webpackChuckName:'city' */'@v/city/CityPicker')
    }, {
        path: '/detail',
        name: '/detail',
        component: () => import(/* webpackChuckName:'detail' */'@v/detail/Detail')
    }
]


const router = new VueRouter({
    routes,
    mode: "hash"
})

export default router