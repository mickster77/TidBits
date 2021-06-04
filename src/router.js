import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import Home from '@/views/Home'
import Tidbits from '@/views/Tidbits'
import ToDo from '@/views/ToDo'
import Test from '@/views/Test'
import FAQ from '@/views/FAQ'
import Burnlist from '@/views/Burnlist'
import Letters from '@/views/Letters'
import Weight from '@/views/Weight'
import Workout from '@/views/Workout'
import Habits from '@/views/Habits'
import ChoreBoard from '@/views/chore/ChoreBoard'
import viewChoreBoard from '@/views/chore/viewChoreBoard'
import UnderConstruction from '@/views/UnderConstruction'
import ShoppingList from '@/views/ShoppingList'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/choreboard',
      name: 'ChoreBoard',
      component: ChoreBoard,
      requiresAuth: true,
    },
    {
      path: '/shoppinglist',
      name: 'ShoppingList',
      component: ShoppingList,
    },
    {
      path: '/habits',
      name: 'Habits',
      component: Habits,
      requiresAuth: true,
    },
    {
      path: '/choreboard/:id',
      name: 'viewChoreBoard',
      component: viewChoreBoard,

    },
    {
      path: '/workout',
      name: 'Workout',
      component: Workout,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/weight',
      name: 'Weight',
      component: Weight,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },

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
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/Burnlist',
      name: 'Burnlist',
      component: Burnlist,
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQ,
    },
    {
      path: '/letters',
      name: 'Letters',
      component: Letters,
    },
    {
      path: '/:uid',
      name: 'Tidbits',
      component: Tidbits,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/todo/:uid',
      name: 'ToDo',
      component: ToDo,
      meta: {
        requiresAuth: true,
      },

    },
    {
      path: '/underconstruction',
      name: 'UnderConstruction',
      component: UnderConstruction,
    },



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