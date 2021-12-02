import axios from "axios";
import FeedService from "../services/feed.service";

const myHead = JSON.parse(localStorage.getItem("user")!);
const API_FEED_URL = "http://localhost:3001/api/feed/";

export const feed = {
  namespaced: true,

  state: {
    feedList: [],
  },
  // Define Actions
  actions: {
    // Récupération de tous les posts
    getPosts({ commit }: { commit: any }) {
      return FeedService.getPosts().then((thePosts: any) => {
        commit("SETFEEDLIST", thePosts.data.data);
      });
    },
    // Utilisation du Store pour ajouter un commentaire
    addComment({ commit }: { commit: any }, comment) {
      return FeedService.addComment(comment).then(
        (theComment) => {
          console.log("thePost inside return >>> ", theComment);
          commit("ADDCOMMENT", theComment);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    // Démarrage de la requête d'envoi du Post en DB via Axios
    createPost({ commit }: { commit: any }, theNewPost) {
      axios
        .post(API_FEED_URL, theNewPost, {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then((thePost: any) => {
          console.log("thePost inside return >>> ", thePost);
          commit("CREATEPOST", thePost.data);
          return thePost;
        })
        .then((thePosts: any) => {
          commit("SETFEEDLIST", thePosts.data.data);
        },
          (error) => {
            return Promise.reject(error);
          }
        );
    },
  },

  // Création de getters
  getters: {
    theFeed: (state) => state.feedList,
  },

  // Define mutations
  mutations: {
    // liste des posts
    SETFEEDLIST(state: any, feedList: any) {
      state.feedList = feedList;
    },
    ADDCOMMENT(state: any, thePost: any) {
      state.thePost.push({ thePost });
    },

    CREATEPOST(state: any, thePost: any) {
      console.log("post in mutation >> ", thePost);
      state.feedList.push(thePost);
    },
  },
};
