import { createRouter, createWebHistory } from 'vue-router'
import { getUserDataFromCookies } from '@/utils/cookiesHandler'
import AEStartPage from '../views/AEStartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AEStartPage,
    },
    {
      path: '/goods-acception',
      name: 'goods-acception',
      component: () => import('../views/AEGoodsAcception/AEGoodsAcception.vue'),
    },
    {
      path: '/cars-send',
      name: 'cars-send',
      component: () => import('../views/AECarsSend.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AEAuth.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userData = getUserDataFromCookies('userData') // проверяем, есть ли куки с данными пользователя
  if (!userData && to.name !== 'auth') {
    next('/auth')
  } else {
    next()
  }
})

export default router
