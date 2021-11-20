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
        :theLikes="thePost.like_list"
      /> 
      <PostBlocImg
        v-else-if="thePost.content === null"
        :theIdPost="thePost.id"
        :thePost="thePost.image_URL"
        theLike:number="152"
      /> 
    </div>
  </div>
</template>

<script setup lang="ts">
import SendPost from '@/components/SendPost.vue';
import PostBlocImg from '@/components/PostIBlocImg.vue';
import PostBlocText from '@/components/PostBlocText.vue';
import { computed, onMounted } from 'vue';
import store from '../store/index';

const myStore: any = store;

const feedList = computed(() => myStore.state.feedList);

onMounted(() => {
  myStore.dispatch("getPosts")
  console.log('Le Store est monté.')
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
</style>
