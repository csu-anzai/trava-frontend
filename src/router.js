import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Journey from './components/Journey.vue'
import Posts from './components/Posts.vue'
import Signup from './components/Signup'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {

      path: '/journeys',
      name: 'journey',
      component: Journey
    },
    {
      path: '/:user_id/journeys/:id',
      name: 'post',
      component: Posts,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      },
  ]
})
