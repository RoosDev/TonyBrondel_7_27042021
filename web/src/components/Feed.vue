<template>
  <div id="feedcontent" class="col-12 col-md-9">
    <SendPost />
    <div id="postsList" v-for="thePost in theFeedList" :key="thePost.id">
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
import { computed } from 'vue';
import { onMounted } from 'vue';
import store from '../store/index';
import SendPost from '@/components/SendPost.vue';
import PostBlocText from '@/components/PostBlocText.vue';
import PostBlocImg from '@/components/PostIBlocImg.vue';


// initialisation du store
const myStore: any = store;
//Connexion au store pour récupération des informations
let theFeedList = computed(() => store.getters.theFeed);

onMounted(() => {
  const storeCurrentUser = computed(() => myStore.state.auth.user);
  const storageCurrentUser = JSON.parse(localStorage.getItem("user")!);
  let currentUser: any;
if(!storeCurrentUser.value){
  console.log('version localStorage')
  currentUser = storageCurrentUser
}else{
  console.log('version store')
  currentUser = storeCurrentUser.value
}

  // Connexion au Store de l'application
  myStore.dispatch("getPosts", { id: currentUser.id, accessToken: currentUser.accessToken, roleToken: currentUser.roleToken })
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
    width: 100vw;
    height: 100%;
    right: 0;
    background-color: $groupo-colorLight1;
    overflow-y: scroll;
  }
}
</style>
