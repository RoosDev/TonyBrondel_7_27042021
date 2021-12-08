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

global.store = store;
export default store;
