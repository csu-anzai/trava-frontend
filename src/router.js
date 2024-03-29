import Vue from 'vue'
import Router from 'vue-router'
import Journey from './components/Journey.vue'
import Posts from './components/Posts.vue'
import Signup from './components/Signup'
import Profile from './views/Profile'
import Login from './components/Login'
import Profileusers from './views/Profileusers'
import Collasp from './components/Collasp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Journey
    },
    {
      path: '/:user_id/journeys/:id',
      name: 'post',
      component: Posts,
    },
    {
      path: '/:user_id/journeys/:id/collasp',
      name: 'collasp',
      component: Collasp,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profileusers
    },
    {
      path: '/myprofile',
      name: 'myProfile',
      component: Profile
    },
    {
      path: '/login',
      name: 'proile',
      get component() {
        if (localStorage.getItem('token')) {
            return Profile;
        } else {
            return Login;
        }
      }
    },
  ]
})
