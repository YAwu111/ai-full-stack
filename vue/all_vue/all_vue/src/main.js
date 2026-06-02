// vue createApp 创建一个App
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由模块
import router from './router';
// 现代前端应用
// 组件化，响应式.... 
// 跟DOM编程say babye
createApp(App)
   .use(router) // 启用路由
// 挂载在#app 上
  .mount('#app')
