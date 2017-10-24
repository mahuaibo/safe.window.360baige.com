import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomePage from '@/components/HomePage'
import AccountAppeal from '@/components/AccountAppeal'
import SecurityTools from '@/components/SecurityTools'
import GetBackPassword from '@/components/GetBackPassword'
import ModifyPassword from '@/components/ModifyPassword'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'homePage'
    },
    children: [{
      name: 'homePage',
      component: HomePage,
      path: '/homePage'
    }, {
      name: 'accountAppeal',
      component: AccountAppeal,
      path: '/accountAppeal'
    }, {
      name: 'securityTools',
      component: SecurityTools,
      path: '/securityTools'
    }, {
      name: 'getBackPassword',
      component: GetBackPassword,
      path: '/getBackPassword'
    }, {
      name: 'modifyPassword',
      component: ModifyPassword,
      path: '/modifyPassword'
    }]
  }
  ]
})
