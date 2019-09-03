import Vue from 'vue'
import Router from 'vue-router'
import Journey from './components/Journey.vue'
import Posts from './components/Posts.vue'
import Signup from './components/Signup'
import Profile from './views/Profile'
import Login from './components/Login'
import UserJourney from './components/UserJourney'
import addJourney from './components/addJourney'
import Follower from './components/Follower'
import Profileusers from './views/Profileusers'

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

      path: '/journeys',
      name: 'journey',
      component: Journey
    },
    {
      path: '/:user_id/journeys',
      name: 'addjourney',
      component: addJourney
    },
    {
      path: '/:user_id/journeys',
      name: 'userjourney',
      component: UserJourney
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
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profileusers,
    },
    {
      path: "/profile",
      name: "home",
      get component() {
          if (true) {
              return Profile;
          } else {
              return Journey;
          }
      }, 
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
