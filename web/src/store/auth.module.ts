import AuthService from "../services/auth.service";
import { useRouter } from "vue-router";

const myRouter: any = useRouter();
const user = JSON.parse(localStorage.getItem("user")!);
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,

  actions: {
    // Utilisation du Store pour se connecter
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("LOGINSUCCESS", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("LOGINFAILURE");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour se déconnecter
    logout({ commit }) {
      AuthService.logout();
      commit("LOGOUT");
    },

    // Utilisation du store pour s inscrire
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("REGISTERSUCCESS");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("REGISTERFAILURE");
          return Promise.reject(error);
        }
      );
    },

  },

  getters:{
    theUserId : (state) => state.user.id,
  },

  mutations: {
    LOGINSUCCESS(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    LOGINFAILURE(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    LOGOUT(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    REGISTERSUCCESS(state) {
      state.status.loggedIn = false;
    },
    REGISTERFAILURE(state) {
      state.status.loggedIn = false;
    },
  },
};
