import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue'
import Cartridge from '../views/Cartridge.vue';
import theFeed from '../views/FeedView.vue';
import theProfile from '../views/ProfileView.vue';
import theAdmin from '../views/Admin.vue';

const routes: Array<RouteRecordRaw> = [

  // Route par la connexion / inscription. C'est la page d'accueil s'il n'y a pas de token existant 
  {
    path: '/',
    name: 'Login',
    components: {
      default: Login,
    },
    meta:{
      title: 'Se connecter',
    }
  },

  // Route pour le flux de post , c'est le coeur du site
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

  // Route pour le profil de l'utilisateur
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

  //Route pour la page admin de gestion des droits utilisateurs.
  {
    path: '/Admin',
    name: 'Admin',
    components: {
      navMenu: Cartridge,
      thePage: theAdmin,
    },
    props:true,
    meta:{
      title: 'Administration des utilisteurs',
    }

  },

  // Route en cas d'accès à une page inexistante
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
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // Tentative d'acces à une page à "acces restreint" avec redirection vers la page de login
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

  // Changement du titre de la page.
router.afterEach((to, from) => {
  document.title = `Groupomania - ${to.meta.title}`;
});



export default router
