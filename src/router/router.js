import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../i18n'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`
  },
  {
    // Paginas que no existan
    path: '*',
    name: '404',
    component: () => import('../views/general/404.vue')
  },
  {
    path: '/:lang',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      // Carousel
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('../views/general/Carousel.vue')
      },
      // User
      {
        path: '',
        name: 'HomeUser',
        component: () => import('../views/user/HomeUser.vue')
      },
      {
        path: 'latin-macro-watch-graficos',
        name: 'LMWG',
        component: () => import('../views/user/LatinMacroWatchGraficos.vue')
        // component: () => import('../components/lmw/PeriodoSelector')
      },
      {
        path: 'latin-macro-watch-datos',
        name: 'LMWD',
        component: () => import('../views/user/LatinMacroWatchDatos.vue')
        // component: () => import('../components/lmw/FechaSelector.vue')
      },
      // Admin
      {
        path: 'admin',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: '',
            name: 'LoginAdmin',
            component: () => import('../views/admin/LoginAdmin.vue')
          },
          {
            path: 'home',
            name: 'HomeAdmin',
            component: () => import('../views/admin/HomeAdmin.vue')
          },
          {
            path: 'password/new/:token',
            name: 'CreatePassword',
            component: () => import('../views/admin/CreatePassword.vue')
          },
          // {
          //   path: 'password/recover/:token',
          //   name: 'RecoverPassword',
          //   component: () => import('../views/admin/CreatePassword.vue')
          // }
        ]
      },
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
