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
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import {
  faSpinner,
  faPaperPlane,
  faHandPeace,
  faSignOutAlt,
  faShieldAlt,
  faUserPlus,
  faImage,
  faEdit,
  faUsersCog,
  faTools,
  faRss,
  faTimesCircle,
  faCheckCircle,
  faKey, 
  faUserEdit,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// initialisation des imports pour Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

// intégration des icones font awesome à la librairy
library.add(faUserSecret);
library.add(faSpinner);
library.add(faPaperPlane);
library.add(faHandPeace);
library.add(faSignOutAlt);
library.add(faShieldAlt);
library.add(faUserPlus);
library.add(faImage);
library.add(faEdit);
library.add(faEdit);
library.add(faUsersCog);
library.add(faTools);
library.add(faRss);
library.add(faTimesCircle);
library.add(faCheckCircle);
library.add(faKey);
library.add(faUserEdit);
library.add(faUniversalAccess);


// Création de l'app
const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(VueAxios, axios);
  app.provide('axios', app.config.globalProperties.axios) ;
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
