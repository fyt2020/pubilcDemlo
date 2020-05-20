import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "exactActive",
  linkActivesClass: "active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        needTooken:false
      },
      redirect:'/bigAngle',
      children:[
        {
          path: 'bigAngle',
          name: 'bigAngle',
          component: Home,
          meta:{
            needTooken:false
          },
          path: 'face',
          name: 'face',
          component: Home,
          meta:{
            needTooken:false
          },
        }
      ]
    }
  ]
})
