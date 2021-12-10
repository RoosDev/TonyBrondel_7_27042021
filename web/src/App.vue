<template>
  <router-view />
  <div id="cartridge" class="col-12 col-xl-3">
    <router-view class="cartridge col-12 col-md-3" name="navMenu"></router-view>
  </div>
  <div id="divPage" class="col-12 col-xl-9">
    <router-view name="thePage"></router-view>
  </div>
  <!-- <div id="appnoncompatible">
    <p>La résolution de votre écran est incompatible avec cette application pour un usage optimal.</p>
    <p>Veuillez changé d'écran.</p>
  </div> -->
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
  template {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    height: 100vh;

    #cartridge {
      height: 100vh;
      display: flex;
    }

    #divPage {
      position: fixed;
      display: flex;
      margin: 0;
      height: 100%;
    }
    // #appnoncompatible {
      
    //   display: none;
      
    // }
  }
}
@media (max-width: 1199px) {
  #app {
    template {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100vw;

      #cartridge {
        width: 100vw;
      }

      #divPage {
        width: 100vw;
      }
      // #appnoncompatible {
      //   display: none;
      // }
    }
  }
}
// @media (max-width: 265px) {
//   #app {
//     #cartridge {
//       display: none;
//     }

//     #divPage {
//       display: none;
//     }
    // #appnoncompatible {
    //   display: flex;
    //   flex-flow: column nowrap;
    //   height: 100vh;
    // }
//   }
// }
</style>
