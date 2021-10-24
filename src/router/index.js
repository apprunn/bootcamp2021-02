import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/exam',
    name: 'Exam',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Exam.vue')
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: ()=> import('../views/Pokemon.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
