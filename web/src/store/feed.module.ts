import axios from "axios";

let myHead = { id: "", accessToken: "", roleToken: "" };
const API_FEED_URL = "http://localhost:3001/api/feed/";

export const feed = {
  // namespaced: true,

  state: {
    feedList: [],
    commentList: [],
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
        .get(API_FEED_URL, {
          headers: {
            "x-access-token": myHead.accessToken,
            "x-role-token": myHead.roleToken,
          },
        })
        .then((thePosts: any) => {
          commit("SETFEEDLIST", thePosts.data.data);
        });
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

    async updatePost({ commit }: { commit: any }, theChangedPost) {
      if (
        theChangedPost.accessToken == null ||
        theChangedPost.roleToken == null
      ) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = theChangedPost.id),
          (myHead.accessToken = theChangedPost.accessToken),
          (myHead.roleToken = theChangedPost.roleToken);
      }
      await axios
        .put(API_FEED_URL + theChangedPost.postId, theChangedPost, {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then(
          (thePosts: any) => {
            console.log("the post answer > ", thePosts.data.data);
            console.log("theChangedPost answer > ", theChangedPost);
            if (thePosts.data.data == 1) {
              axios
                .get(API_FEED_URL, {
                  headers: {
                    "x-access-token": myHead.accessToken,
                    "x-role-token": myHead.roleToken,
                  },
                })
                .then((thePosts: any) => {
                  commit("SETFEEDLIST", thePosts.data.data);
                });
            }
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
      await axios
        .delete(API_FEED_URL + postToDelete, {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then(
          (thePosts: any) => {
            console.log("delete on the way");
            commit("SETFEEDLIST", thePosts.data.data);
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    },

    // async getComments({ commit }: { commit: any }, commentData) {
    //   if (commentData.accessToken == null || commentData.roleToken == null) {
    //     myHead = JSON.parse(localStorage.getItem("user")!);
    //   } else {
    //     (myHead.id = commentData.id),
    //       (myHead.accessToken = commentData.accessToken),
    //       (myHead.roleToken = commentData.roleToken);
    //   }
    //   await axios
    //     .get(API_FEED_URL + commentData.PostId + '/comment', {
    //       headers: {
    //         "x-access-token": myHead.accessToken,
    //         "x-role-token": myHead.roleToken,
    //       },
    //     })
    //     .then((theComments: any) => {
    //       console.log('comment list avant envoi >> ',theComments.data.data )
    //       commit("SETCOMMENTLIST", theComments.data.data);
    //     });
    // },

    async createComment({ commit }: { commit: any }, theNewComment) {
      console.log("et c est parti pour un nouveau commentaire");
      console.log("commentaire :: ", theNewComment);
      if (
        theNewComment.accessToken == null ||
        theNewComment.roleToken == null
      ) {
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = theNewComment.id),
          (myHead.accessToken = theNewComment.accessToken),
          (myHead.roleToken = theNewComment.roleToken);
      }
      axios
        .post(
          API_FEED_URL + theNewComment.theIdPost + "/comment",
          theNewComment,
          {
            headers: {
              "x-access-token": myHead.accessToken!,
              "x-role-token": myHead.roleToken!,
              id: myHead.id!,
            },
          }
        )
        .then((theComment: any) => {
          console.log("les données : ", theComment);
          console.log("j ai les données, lancement de recherche");
          if (theComment.data.data == 1) {
            //   console.log('comment value = 1')
            //   axios
            //     .get(API_FEED_URL, {
            //       headers: {
            //         "x-access-token": myHead.accessToken,
            //         "x-role-token": myHead.roleToken,
            //       },
            //     })
            //     .then((thePosts: any) => {
            // console.log('retour de la recherche')

            commit("SETFEEDLIST");
            //     });
            // }
          }
          (error) => {
            return Promise.reject(error);
          };
          // );
        });
    },

    async deleteComment({ commit }: { commit: any }, commentToDelete) {
      console.log("comment to delete :: ", commentToDelete)
      if (commentToDelete.accessToken == null || commentToDelete.roleToken == null) {
        console.log("my head is null");
        myHead = JSON.parse(localStorage.getItem("user")!);
      } else {
        (myHead.id = commentToDelete.id),
          (myHead.accessToken = commentToDelete.accessToken),
          (myHead.roleToken = commentToDelete.roleToken);
      }
      await axios
        .delete(API_FEED_URL + commentToDelete + "/comment", {
          headers: {
            "x-access-token": myHead.accessToken!,
            "x-role-token": myHead.roleToken!,
          },
        })
        .then(
          (thePosts: any) => {
            console.log("delete on the way");
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
    theComments: (state) => state.commentList,
  },

  // Define mutations
  mutations: {
    // liste des posts
    SETFEEDLIST(state: any, feedList: any) {
      state.feedList = feedList;
    },
    SETCOMMENTLIST(state: any, commentList: any) {
      state.commentList = commentList;
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
