import { createRouter, createWebHashHistory } from 'vue-router'

const routers = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue'),
  },
  {
    path: '/OrderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () =>
      import(/* webpackChunkName: "shop" */ '../views/orderConfirmation/OrderConfirmation.vue'),
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "shop" */ '../views/orderList/OrderList.vue'),
  },

  {
    path: '/person',
    name: 'PersonalInfo',
    component: () =>
      import(/* webpackChunkName: "person" */ '../views/personalInfo/PersonalInfo.vue'),
  },
  {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () =>
      import(/* webpackChunkName: "myAddressList" */ '../views/myAddressList/MyAddressList.vue'),
  },
  {
    path: '/chooseAddressList:shopId',
    name: 'ChooseAddressList',
    component: () =>
      import(
        /* webpackChunkName: "myAddressList" */ '../views/chooseAddressList/ChooseAddressList.vue'
      ),
  },
  {
    path: '/upsertAddress/:id?',
    name: 'UpsertAddress',
    component: () =>
      import(/* webpackChunkName: "upsertAddress" */ '../views/upsertAddress/UpsertAddress.vue'),
  },
  {
    path: '/text',
    name: 'Text',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Text.vue'),
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import(/* webpackChunkName: "register" */ '../views/register/Register.vue'),
  //   beforeEnter(to, from, next) {
  //     const { isLogin } = localStorage
  //     isLogin ? next({ name: 'Home' }) : next()
  //   },
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
  //   beforeEnter(to, from, next) {
  //     const { isLogin } = localStorage
  //     isLogin ? next({ name: 'Home' }) : next()
  //   },
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
})

// router.beforeEach((to, from, next) => {
//   const { isLogin } = localStorage
//   const { name } = to
//   const isLoginOrRegister = name === 'Login' || name === 'Register'
//   isLogin || isLoginOrRegister ? next() : next({ name: 'Login' })
// })

export default router
