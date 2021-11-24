<template>
  <div id="cartridge" class="col-12 col-md-3">
    <Cartridge />
  </div>
  <div id="Feed" class="col-12 col-md-9">
    <Feed />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Cartridge from '@/components/Cartridge.vue';
import Feed from '@/components/Feed.vue';
import store from '../store/index';
import { useRouter } from "vue-router";

const myRouter: any = useRouter();
const myStore: any = store;

// Vérification de l'authentification de l'utilisateur
const currentUser = computed(() => myStore.state.auth.user);
onMounted(() => {
  if (!currentUser.value) {
    myRouter.push('/login');
  }
})

onMounted(() => {
  myStore.dispatch("getPosts")
})

</script>

<style lang="scss">
@import "../scss/variables.scss";

template {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;

  #cartridge {
    height: 100vh;
  }

  #Feed {
    position: fixed;
    margin: 0;
    height: 100%;
  }
}
</style>
