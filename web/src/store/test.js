import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export default createStore({
  state: {
    allPosts:[],
  },
  mutations: {
    feedList: function (state, getPosts) {
      state.allPosts = getPosts;
    },
  },
  actions: {
    getPosts: ({commit}) => {
      instance.post('/feed')
      .then(function (response:any) {
        commit('getPosts', response.data.infos);
      })
      .catch(function () {
        return console.log('erreur fatale, j\'aurai dû t\'écouter');
      });
    }
  },
  modules: {
  }
})
