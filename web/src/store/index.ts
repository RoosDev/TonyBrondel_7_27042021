// Imports
import { createStore } from "vuex";
import { auth } from "./auth.module";
import { feed } from "./feed.module";
import { usersBase } from "./users.module";

//Create Store :
const store = createStore({
  // import du module d authentification dans Vuex
  modules: {
    auth: auth,
    feed: feed,
    users: usersBase,
  },
  strict : true
});

// if (module.hot) {
//   // accepter les actions et mutations en tant que module à chaud
//   module.hot.accept([
//     './auth.module',
//     './feed.module', 
//     './user.module'
//   ], () => {
//     // requiert les modules à jour
//     // ajout de `.default` ici pour les sorties des modules babel 6
//     const newModuleAuth = require('./auth.module').default
//     const newModuleFeed = require('./feed.module').default
//     const newModuleUser = require('./user.module').default
//     // remplacer les nouveaux modules et mutations
//     store.hotUpdate({
//       modules: {
//         auth: newModuleAuth,
//         feed: newModuleFeed,
//         users: newModuleUser
//       }
//     })
//   })
// }

global.store = store;
export default store;
