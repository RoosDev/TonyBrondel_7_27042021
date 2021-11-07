// Imports
import { createStore } from "vuex";
import axios from "axios";

//Create Store :

export const store = createStore({
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
        .get("http://localhost:3001/api/feed")
        .then((thePosts: any) => {
          commit("setFeedList", thePosts.data.data);
        })
        // .then((theLikes: any) => {
        //   commit("setCountLikes", theLikes.data.likes);
        // })

    },

  },

  // Define mutations
  mutations: {
    setFeedList(state: any, feedList: any) {
      state.feedList = feedList;
    },
    // setCountLikes(state: any, totalLikes: any) {
    //   state.totalLikes = totalLikes;
    // },

  },
});
