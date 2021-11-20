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
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Feed" */ '../views/Home.vue'),
    props:true,
    meta:{
      title: 'le flux d\'actu.',
    }

  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Feed" */ '../views/Profile.vue'),
    props:true,
    meta:{
      title: 'Profil',
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
    path: '/login',
    name: 'Log',
    component: () => import('../components/Log.vue'),
    meta:{
      title: 'Connectez vous',
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/signup', '/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // console.log(from,to);
  document.title = `Groupomania - ${to.meta.title}`;
});



export default router
