# 启动：
## link
npx react-native link 
## android
npx react-native run-android

# Navigator
Navigator可以让你在应用的不同场景（页面）间进行切换。
Navigator通过路由对象来分辨不同的场景。
利用renderScene方法，Navigator可以根据指定的路由来渲染场景。
可以通过configureScene属性获取指定路由对象的配置信息，从而改变场景的动画或者手势。

# 常用方法
getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
jumpTo(route) - 跳转到已有的场景并且不卸载。
push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
pop() - 跳转回去并且卸载掉当前场景
replace(route) - 用一个新的路由替换掉当前场景
replaceAtIndex(route, index) - 替换掉指定序列的路由场景
replacePrevious(route) - 替换掉之前的场景
resetTo(route) - 跳转到新的场景，并且重置整个路由栈
immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
# Redux
因后面有专门讲 Redux 的, 所以这次的教程不讲Redux 相关的知识,以减少复杂,有利于理解.
# 项目结构约定
- 因为 js 并没有包名或着说命名空间, 所以我们以文件夹来作为命名空间的划分
- 命名空间使用单数单词,或自定义单词来命名,并且是是小写的
- 命名空间的划分不要按界面流程来划分, 按模块处理的功能来划分
- src 下命名空间竟然不要超过3层
```shell
 |- src 业务 JS 源代码
    |- action       | 动作层
    |- reduer       | 数据处理层
    |- common       | 公共 
    |- component    | 组件
    |- constant     | 常量 
    |- img          | 图片资源
    |- module       | 原生支持模块
    |- untils       | 工具类
    |- view         | 页面
    |- app.js       | 项目 js 入口,面对于项目, (有别于 index.*.js,面向于原生调用)
```

- 模块名都是使用大写开头的驼峰式命名
```shell
  |- common
    |- Immutables.js
    |- Reducers.js
    |- Request.js
    |- Response.js
    |- Toasts.js
  |- components
    |- ActivityIndicator.js
    |- CheckBox.js
```

- Component 的 propType, defaultProps 要写class 里面
(未完待续)


参考： https://blog.csdn.net/vispin/article/details/52999459 