// router 模块 定义路由
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home.vue'
import About from '../view/About.vue'

const routes = [
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/about',
        name:'About',
        component:About
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;