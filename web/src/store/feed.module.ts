import axios from "axios";

let myHead = { id: "", accessToken: "", roleToken: "" };
const API_FEED_URL = "http://localhost:3001/api/feed/";

export const feed = {
  // namespaced: true,

  state: {
    feedList: [],
  },
  // Define Actions
  actions: {
    // Récupération de tous les posts
    async getPosts({ commit }: { commit: any }, userDatas) {
      if (userDatas.accessToken == null || userDatas.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = userDatas.id),
          (myHead.accessToken = userDatas.accessToken),
          (myHead.roleToken = userDatas.roleToken);
      }
      await axios
        .get("http://localhost:3001/api/feed", {
          headers: {
            "x-access-token": userDatas.accessToken,
            "x-role-token": userDatas.roleToken,
          },
        })
        .then((thePosts: any) => {
          commit("SETFEEDLIST", thePosts.data.data);
        });
    },
    // Utilisation du Store pour ajouter un commentaire
    async addComment({ commit }: { commit: any }, comment) {
      if (comment.accessToken == null || comment.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = comment.id),
          (myHead.accessToken = comment.accessToken),
          (myHead.roleToken = comment.roleToken);
      }
      await axios
        .put(
          API_FEED_URL + comment.id + "/comment",
          {
            id: myHead.id,
            content: comment.theNewComment.content,
          },
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
              id: myHead.id!,
            },
          }
        )
        .then(
          (theComment) => {
            console.log("thePost inside return >>> ", theComment);
            commit("ADDCOMMENT", theComment);
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    },

    async createPost({ commit }: { commit: any }, theNewPost) {
      if (theNewPost.accessToken == null || theNewPost.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = theNewPost.id),
          (myHead.accessToken = theNewPost.accessToken),
          (myHead.roleToken = theNewPost.roleToken);
      }
      await axios
        .post(API_FEED_URL, theNewPost, {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then(
          (thePosts: any) => {
            commit("SETFEEDLIST", thePosts.data.data);
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    },
    async deletePost({ commit }: { commit: any }, postToDelete) {
      if (postToDelete.accessToken == null || postToDelete.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = postToDelete.id),
          (myHead.accessToken = postToDelete.accessToken),
          (myHead.roleToken = postToDelete.roleToken);
      }
      console.log("my head before delete >> ", myHead)
      await axios
        .delete(API_FEED_URL + postToDelete, {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then(
          (thePosts: any) => {
            console.log('delete on the way')
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
