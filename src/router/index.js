import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoList from '@/views/TodoListStat.vue'
import TodoListSaveForm from '@/views/TodoListSaveForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/list',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/list',
    name: 'todoList',
    component: TodoList
  },
  {
    path: '/saveForm',
    name: 'todoListSaveForm',
    component: TodoListSaveForm   // 상단에 컴포넌트 파일을 import하고 가져와 사용하는 방법.
    // component: () => import('../views/TodoListSaveForm.vue')   // 함수 방식으로 컴포넌트를 직접 import하는 방법.
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
