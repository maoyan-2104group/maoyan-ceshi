### vue 目录认识

build 打包的 webpack 配置内容

config

node_modules 依赖包

src 存放项目的源代码

assets 项目中的图片资源 全局样式 icons 包括 css 预处理相关的全局函数封装

components 项目中用到的组件封装 可重用组件（例如表单字段按钮）保留在/components 文件夹中。

router 所有的放在 router 文件夹的 index.js 文件中中

utilis 封装的函数 如 axios 请求

views 将用作页面的组件（路由到类似页面进行导航）保留在/views 文件夹中

App.vue 项目最原始的根组件

main.js 整个项目的入口文件 因为装了脚手架 webpack 就自动读取 main.js 文件

static 存放的静态资源

vue.config.js 项目中的配置文件 反向代理 和目录简写

package.json 文件：npm/cnpm 包配置文件 定义项目的 npm 脚本 及依赖包的信息

babel.config 插件集合 如 vant

gitignore：忽略某个或一组文件 git 提交的一个配置

.browserslistrc 浏览器的兼容

### vue 项目创建

搭建脚手架 引入相关的依赖

### vue 项目认识

1. main.js 是我们这个程序的入门 ，名字是固定且不可修改，在这个文件中需要导入 vue，app，router 包括渲染函数载入 router app 并且引入全局样式

2. 配置好相关的路由，路由配置在 router 文件夹中 index.js 配置，需要导入 vue 和路由插件并且使用，创建和配置好 new VueRouter 并且定义当前路由类型 mode 暴露出去。这里所配置的一级路由会在 App.vue 中用<router-view></router-view>插座显示。

而配置路由首先是根据在 views 中建立的文件夹相应的配置好路由，views 配置的子路由会在 App.vue 被载入，views 创建一级路由相应的页面，
使用 kebab-case 命名的文件夹，PascalCase 命名的 vue 文件。
如猫眼电影中一级路由有 city 代表城市选择 home 就代表主页面 详情 订单等。
二级路由就比如说 home 里面的 movies 和 profile 也要建立相应的文件 同时在 home 建立一个和其二级路由平级的 vue 文件，同时用<router-view></router-view>来载入二级路由里面所点击跳转的路由，后面还有依次拆分载入
组件优化是可以异步加载 点一下在加载 improt 实际上是一个 promise 把下面这个打包成一个单独的文件 切换路由才加载 同时使用魔法注释

3. App vue 简单就是说打开页面时候都是进入的 App.vue App.vue 也是加载定义好的第一层路由 用插座挂载配置的一级路由<router-view></router-view>

4. 在相应的页面写入相应的文件
