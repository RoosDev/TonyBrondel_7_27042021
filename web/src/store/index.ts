// Imports 
// import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios';


//Create Store :

export const store = createStore({

  // Define state
  state () {
    return{
      feedList: [],
    }
  },

  // Define Actions
  actions: {
    async getPosts( { commit }: { commit:any} ) {
      await axios.get('http://localhost:3001/api/feed')
          .then((thePosts:any) => {
            commit('setFeedList', thePosts.data)
      })
    }
  },

  // Define mutations
  mutations: {
    setFeedList(state:any, feedList:any) {
      state.feedList = feedList
    }
  }, 

})


// export default store();
// const app = createApp({})
// app.use(store)