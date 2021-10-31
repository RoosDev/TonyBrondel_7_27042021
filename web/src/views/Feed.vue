<template>
  <div id="Feed">
    <div id="profil" class="col-12 col-md-3">
      <Cartridge />
    </div>
    <div id="feedcontent" class="col-12 col-md-9">
      <SendPost />
      <div id="testlist" v-for="thePost in feedList" :key="thePost">
        {{ thePost }}
        <PostBlocText
          id="" 
          thePost="Ouai mais c'est génial !! on s'éclate trop de ouf!!"
          theLike:number="637"
        />
        <PostBlocImg 
          id="" 
          thePost="life_in_elevator.47bee9ab.gif" 
          theLike:number="152"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Cartridge from '@/components/Cartridge.vue';
import SendPost from '@/components/SendPost.vue';
import PostBlocImg from '@/components/PostIBlocImg.vue';
import PostBlocText from '@/components/PostBlocText.vue';
import { computed } from 'vue'
import { store } from '../store/index'


export default {
  name: 'Feed',
  components: {
    Cartridge,
    SendPost,
    PostBlocImg,
    PostBlocText
  },

  setup () {
    const myStore:any = store

    const feedList = computed(() => myStore.state.feedList);
    console.log("feedList > " + feedList.value);
    return {
      feedList
    };
  },

  mounted() {
    const myStore:any = store
    myStore.dispatch("getPosts");
  }
}
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
