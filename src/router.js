import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import Home from '@/views/Home'
import NewRequest from '@/views/NewRequest'
import ViewRequest from '@/views/ViewRequest'
import ManageRequest from '@/views/ManageRequest'
import EditRequest from '@/views/EditRequest'
import Burnlist from '@/views/Burnlist'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/new-request',
      name: 'NewRequest',
      component: NewRequest,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/view-request/:request_id',
      name: 'ViewRequest',
      component: ViewRequest,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/edit-request/:request_id',
      name: 'EditRequest',
      component: EditRequest,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/manage-request/:request_id',
      name: 'ManageRequest',
      component: ManageRequest,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/burnlist/',
      name: 'Burnlist',
      component: Burnlist,
      meta: {
        requiresAuth: false,
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requres Auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {

    // check Auth state of user
    let user = firebase.auth().currentUser

    // offline testing uncomment below and comment above
    // let user = true

    if (user) {
      // user is signed in, proceed
      next()
    } else {
      // no user is signed in, redirect login
      alert('you need to be logged in to access this page')
      next({ name: 'Login' })
    }
  } else {
    // selected route does not require a user to be logged in, so send to disired route
    next()
  }
})

export default router