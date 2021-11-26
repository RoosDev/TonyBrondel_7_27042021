import AuthService from "../services/auth.service";

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
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour se déconnecter
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },

    // Utilisation du store pour s inscrire
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour changer son mot de passe
    changePass({ commit }, user) {
      return AuthService.changePass(user).then(
        (response) => {
          commit("loginSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour changer son profil
    changeProfile({ commit }, user) {
      return AuthService.UpdateProfil(user).then(
        (response) => {
          commit("loginSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour changer son rôle
    changeRole({ commit }, user) {
      return AuthService.updateRole(user).then(
        (response) => {
          commit("loginSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    // Utilisation du Store pour ajouter un commentaire
    addComment({ commit }, user) {
        return AuthService.addComment(user).then(
          (response) => {
            commit("loginSuccess");
            return Promise.resolve(response.data);
          },
          (error) => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        );
      },
    },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
