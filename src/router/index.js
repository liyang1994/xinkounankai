import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Search from '@/components/Search'
import Chat from '@/components/Chat'
import Setting from '@/components/Setting'
import axios from 'axios'
Vue.use(Router)
Vue.prototype.$axios = axios
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
