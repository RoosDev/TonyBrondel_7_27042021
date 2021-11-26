// Imports
import { createStore } from "vuex";
import axios from "axios";
import { auth } from "./auth.module";


//Create Store :

const store = createStore({
  state() {
    return {
      feedList: [],
      userDetail: [],
    };
  },

  // Define Actions
  actions: {
    // Récupération de tous les posts
    async getPosts({ commit }: { commit: any }) {
      const user = JSON.parse(localStorage.getItem("user")!);
      await axios
        .get("http://localhost:3001/api/feed", {
          headers: {
            "x-access-token": user.accessToken,
            "x-role-token": user.roleToken,
          },
        })
        .then((thePosts: any) => {
          commit("setFeedList", thePosts.data.data);
        });
    },

    // Récupération d'un seul utilisateur
    async getUser({ commit }: { commit: any }, userId) {
      const user = JSON.parse(localStorage.getItem("user")!);
      const myId = userId.id;
      await axios
        .get("http://localhost:3001/api/auth/profile/" + myId, {
          headers: {
            "x-access-token": user.accessToken,
            "x-role-token": user.roleToken,
          },
        })
        .then((theUser: any) => {
          commit("setUserDetail", theUser.data.data);
        });
    },

    // Récupération de tous les utilisateurs
    async getUsers({ commit }: { commit: any }) {
      const user = JSON.parse(localStorage.getItem("user")!);
      await axios
        .get("http://localhost:3001/api/auth/profile/", {
          headers: {
            "x-access-token": user.accessToken,
            "x-role-token": user.roleToken,
          },
        })
        .then((theUsers: any) => {
          commit("setUsers", theUsers.data.data);
        });
    },
  },

  // Define mutations
  mutations: {
    // liste des posts
    setFeedList(state: any, feedList: any) {
      state.feedList = feedList;
    },

    // Détail du profil d'un utilisateur
    setUserDetail(state: any, userDetail: any) {
      state.userDetail = userDetail;
    },

    // List des utilisateurs
    setUsers(state: any, usersList: any) {
      state.usersList = usersList;
    },
  },

  // import du module d authentification dans Vuex
  modules: {
    auth,
  },
});

export default store;
