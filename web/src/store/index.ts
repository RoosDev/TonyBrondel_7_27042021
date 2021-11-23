// Imports
import { createStore } from "vuex";
import axios from "axios";
import { auth } from "./auth.module";

const user = JSON.parse(localStorage.getItem("user")!);

//Create Store :

const store = createStore({
  // Define state
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
      // .then((theLikes: any) => {
      //   commit("setCountLikes", theLikes.data.likes);
      // })
    },

    // Récupération d'un seul utilisateur
    async getUser({ commit }: { commit: any }, userId) {
      const myId = userId.id;
      await axios
        .get("http://localhost:3001/api/auth/profile/" + myId, {
          headers: {
            "x-access-token": user.accessToken!,
            "x-role-token": user.roleToken!,
          },
        })
        .then((theUser: any) => {
          commit("setUserDetail", theUser.data.data);
        });
    },

    // Récupération de tous les utilisateurs
    async getUsers({ commit }: { commit: any }) {
      await axios
        .get("http://localhost:3001/api/auth/profile/", {
          headers: {
            "x-access-token": user.accessToken!,
            "x-role-token": user.roleToken!,
          },
        })
        .then((theUsers: any) => {
          commit("setUsers", theUsers.data.data);
        });
    },

    //   async getComments({ commit }: { commit: any }, {idPost})  {
    //     await axios
    //       .get("http://localhost:3001/api/feed/"+idPost+"/comments")
    //       .then((theComments: any) => {
    //         console.log('url :>> ', "http://localhost:3001/api/feed/"+idPost+"/comments")
    //         commit("setCommentList", theComments.data.data);
    //       })
    //   },
  },

  // Define mutations
  mutations: {
    setFeedList(state: any, feedList: any) {
      state.feedList = feedList;
    },
    // setCountLikes(state: any, totalLikes: any) {
    //   state.totalLikes = totalLikes;
    // },

    setUserDetail(state: any, userDetail: any) {
      state.userDetail = userDetail;
    },

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
