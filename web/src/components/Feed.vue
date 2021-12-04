<template>
  <div id="feedcontent" class="col-12 col-md-9">
    <SendPost />
    <div id="postsList" v-for="thePost in feedList" :key="thePost.id">
      <PostBlocText
        v-if="thePost.image_URL === null"
        :theIdPost="thePost.id"
        :theTxtPost="thePost.content"
        :theAuthor="thePost.authorPost"
        :theDate="thePost.createdAt"
        :theComments="thePost.comment_list"
      />
      <PostBlocImg
        v-else-if="thePost.content === null"
        :theIdPost="thePost.id"
        :theImgPost="thePost.image_URL"
        :theAuthor="thePost.authorPost"
        :theDate="thePost.createdAt"
        :theComments="thePost.comment_list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SendPost from '@/components/SendPost.vue';
import PostBlocImg from '@/components/PostIBlocImg.vue';
import PostBlocText from '@/components/PostBlocText.vue';
import { computed, onMounted, reactive } from 'vue';
import Vuex from 'vuex';
import store from '../store/index';


// initialisation du store
const myStore: any = store;
//Connexion au store pour récupération des informations
let theFeedList = computed(() => myStore.state.feed.feedList);
let feedList = reactive(theFeedList)

// let theFeed = computed(() => { return Vuex.mapGetters(['feed / theFeed'])});
// console.log('ma feed list via getter >> ', theFeed.value)

onMounted(() => {
  const currentUser = computed(() => myStore.state.auth.user);
  const myId = currentUser.value.id!;
  const myaccessToken = currentUser.value.accessToken!;
  const myroleToken = currentUser.value.roleToken!;

  // Connexion au Store de l'application
  myStore.dispatch("getPosts", { id: myId, accessToken: myaccessToken, roleToken: myroleToken })
})

</script>

<style lang="scss">
@import "../scss/variables.scss";

#feedcontent {
  position: fixed;
  height: 100%;
  right: 0;
  background-color: $groupo-colorLight1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
    color: $groupo-color1;
  }

  ::-webkit-scrollbar-track {
    background: $groupo-colorLight2;
    width: 20px;
    -webkit-box-shadow: inset 0 0 6px rgba($groupo-color4, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background: $groupo-color4;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: $groupo-color1;
  }
}

@media (max-width: 1199.99px) {
  #feedcontent {
    width : 100vw;
    height: 100%;
    right: 0;
    background-color: $groupo-colorLight1;
    overflow-y: scroll;

  }
}
</style>
