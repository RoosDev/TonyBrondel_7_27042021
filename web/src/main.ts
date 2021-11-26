// initialisation des éléments pours VUE
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'



// initialisation des imports pour Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faCheckCircle,
  faEdit,
  faHandPeace,
  faImage,
  faKey, 
  faPaperPlane,
  faRss,
  faShieldAlt,
  faSignOutAlt,
  faSpinner,
  faTimesCircle,
  faTools,
  faUniversalAccess,
  faUserEdit,
  faUsersCog,
  faUserPlus,
  faUserSecret ,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// initialisation des imports pour Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

// intégration des icones font awesome à la librairy
library.add(faCheckCircle);
library.add(faEdit);
library.add(faHandPeace);
library.add(faImage);
library.add(faKey);
library.add(faPaperPlane);
library.add(faRss);
library.add(faShieldAlt);
library.add(faSignOutAlt);
library.add(faSpinner);
library.add(faTimesCircle);
library.add(faTools);
library.add(faUniversalAccess);
library.add(faUserEdit);
library.add(faUsersCog);
library.add(faUserPlus);
library.add(faUserSecret);


// Création de l'app
const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(VueAxios, axios);
  app.provide('axios', app.config.globalProperties.axios) ;
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
