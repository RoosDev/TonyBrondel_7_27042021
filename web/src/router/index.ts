import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'), 
    meta:{
      title: 'Se connecter',
    }
  },
  {
    path: '/Feed',
    name: 'Feed',
    component: () => import(/* webpackChunkName: "Feed" */ '../views/Feed.vue'),
    props:true,
    meta:{
      title: 'le flux d\'actu.',
    }

  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue'),
    meta:{
      title: 'Inscrivez-vous',
    }

  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: () => import( '../components/NotFound.vue'),
    meta:{
      title: '404 - Page inconnue',
    }

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  console.log(from,to);
  document.title = `Groupomania - ${to.meta.title}`;
});

export default router
