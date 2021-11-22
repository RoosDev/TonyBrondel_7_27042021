import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue'
import Home from '../views/Cartridge.vue';
import Cartridge from '../views/Cartridge.vue';
import theFeed from '../views/FeedView.vue';
import theProfile from '../views/Profile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    // component: () => import('../views/Login.vue'), 
    components: {
      default: Login,
    },
    meta:{
      title: 'Se connecter',
    }
  },
  {
    path: '/Home',
    name: 'Home',
    components: {
      navMenu: Cartridge,
      thePage: theFeed,
    },
    props:true,
    meta:{
      title: 'le flux d\'actu.',
    }

  },
  {
    path: '/Profile',
    name: 'Profile',
    components: {
      navMenu: Cartridge,
      thePage: theProfile,
    },
    props:true,
    meta:{
      title: 'Profil',
    }

  },

  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: () => import('../components/Signup.vue'),
  //   meta:{
  //     title: 'Inscrivez-vous',
  //   }

  // },
  // {
  //   path: '/login',
  //   name: 'Log',
  //   component: () => import('../components/Log.vue'),
  //   meta:{
  //     title: 'Connectez vous',
  //   }

  // },
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
