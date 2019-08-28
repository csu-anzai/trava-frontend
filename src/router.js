import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Journey from './components/Journey.vue'
import Posts from './components/Posts.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Journey
    },
    {
    path: '/:user_id/journeys/:id',
    name: 'post',
    component: Posts,
    },
    {
      path: '/about',
      name: 'about',
      component: function () { return import('./views/About.vue')
      }

    }
  ]
})
