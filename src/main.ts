//vue3框架提供的方法createApp可以用来创建应用实例
import { createApp } from 'vue'
//引入清除默认样式
import '@/assets/style/index.css'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入根组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入createPinia，用于创建pinia 
import { createPinia } from 'pinia'



/* 创建pinia */
const pinia = createPinia()
// 创建应用实例
const app = createApp(App)

// 注册路由
app.use(router)
/* 使用插件 */{}
app.use(pinia)
// 注册 Element Plus
app.use(ElementPlus)



// 挂载应用实例
app.mount('#app')