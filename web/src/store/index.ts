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
    };
  },

  // Define Actions
  actions: {
    async getPosts({ commit }: { commit: any }) {
      await axios
        .get("http://localhost:3001/api/feed" ,{
          headers: { "x-access-token": user.accessToken, "x-role-token": user.roleToken },})
        .then((thePosts: any) => {
          commit("setFeedList", thePosts.data.data);
        })
        // .then((theLikes: any) => {
        //   commit("setCountLikes", theLikes.data.likes);
        // })
    },
    async getUser({ commit }: { commit: any }, id) {
      const userId=id.id;
      console.log("my user",userId)
      await axios
        .get("http://localhost:3001/api/auth/profile/"+userId ,{
          headers: { "x-access-token": user.accessToken, "x-role-token": user.roleToken },})
        .then((theUser: any) => {
          console.log('id recu >>' , id)
          commit("setUserDetail", theUser.data.data);
          console.log('theuser >>' , theUser.data.data);
        })
        // .then((theLikes: any) => {
        //   commit("setCountLikes", theLikes.data.likes);
        // })
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
    // setCommentList(state: any, commentList: any) {
    //   state.commentList = commentList;
    // },
    // setCountLikes(state: any, totalLikes: any) {
    //   state.totalLikes = totalLikes;
    // },

    setUserDetail(state: any, userDetail: any) {
      state.userDetail = userDetail;
      console.log('user detail hot >> ',userDetail);
    },

  },

// import du module d authentification dans Vuex
  modules: {
    auth,
  },
  
});

export default store;
