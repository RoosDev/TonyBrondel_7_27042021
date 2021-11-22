<template>
  <router-view />
  <div id="cartridge" class="col-12 col-md-3">
    <router-view class="cartridge col-12 col-md-3" name="navMenu"></router-view>
  </div>
  <div id="divPage" class="col-12 col-md-9">
    <router-view name="thePage"></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import store from './store/index';
import { useRouter } from "vue-router";

const myRouter: any = useRouter();
const myStore: any = store;

// Vérification de l'authentification de l'utilisateur
const currentUser = computed(() => myStore.state.auth.user);
onMounted(() => {
  if (!currentUser.value) {
    myRouter.push('/');
  }
})

</script>
<style lang="scss">
@import "./scss/variables.scss";

#app {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: $groupo-colorLight1;
  margin: 0;

  ::-webkit-scrollbar {
    width: 11px;
    color: $groupo-color1;
  }

  ::-webkit-scrollbar-track {
    background: $groupo-color4;
    width: 20px;
    -webkit-box-shadow: inset 0 0 6px rgba($groupo-colorLight1, 1);
  }

  ::-webkit-scrollbar-thumb {
    background: $groupo-color1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: $groupo-color1;
  }
}
template {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;

  #cartridge {
    height: 100vh;
  }

  #divPage {
    position: fixed;
    margin: 0;
    height: 100%;
  }
}
</style>
