// Imports
import { createStore } from "vuex";
import axios from "axios";

//Create Store :

export const store = createStore({
  // Define state
  state() {
    return {
      feedList: [],
      commentList: [],
    };
  },

  // Define Actions
  actions: {
    async getPosts({ commit }: { commit: any }) {
      await axios
        .get("http://localhost:3001/api/feed")
        .then((thePosts: any) => {
          commit("setFeedList", thePosts.data.data);
        });
    },
    async getComments({ commit }: { commit: any }, theIDPost ) {
      await axios
        .get("http://localhost:3001/api/feed/"+ theIDPost.id +"/comment")
        .then((theComments: any) => {
          commit("setCommentList", theComments.data.data);
        });
    },

  },

  // Define mutations
  mutations: {
    setFeedList(state: any, feedList: any) {
      state.feedList = feedList;
    },
    setCommentList(state: any, commentList: any) {
      state.commentList = commentList;
    },

  },
});
