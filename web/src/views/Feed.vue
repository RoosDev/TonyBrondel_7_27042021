<template>
  <div id="Feed">
    <div id="profil" class="col-12 col-md-3">
      <Cartridge />
    </div>
    <div id="feedcontent" class="col-12 col-md-9">
      <SendPost />
      <PostBlocImg thePost="life_in_elevator.47bee9ab.gif"  theLike:number=152  />
      <PostBlocText thePost="Ouai mais c'est génial !! on s'éclate trop de ouf!!"  theLike:number=637  />
      <!-- <PostBlocText v-for="post in feedList" :key="post.id"/> -->
      <PostBlocImg />
      <PostBlocImg /> 
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue from 'vue';
// import { inject } from 'vue'
import Cartridge from '@/components/Cartridge.vue';
import SendPost from '@/components/SendPost.vue';
import PostBlocImg from '@/components/PostIBlocImg.vue';
import PostBlocText from '@/components/PostBlocText.vue';

declare function require(path: string): any;
const FeedDataService = require("../services/FeedData_Service.js");

Vue.createApp({
  data() {
    return {
      feeds: Number ,
    }
  },
  methods: {
    allPosts() {
      FeedDataService.getAllPosts()
        .then((res:any) => {
          this.feeds = res.data;
          console.log(res.data);
        })
        .catch((err:any) => {
          console.log(err);
        });
    },
  }
});
</script>

<style lang="scss">
@import "../scss/variables.scss";

#profil {
  position: fixed;
  margin: 0;
  height: 100%;
}

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
