<template>
  <header id="cartridge" class="cartridge">
    <div id="cartridge_Top" class="cartridge_Top">
      <div id="logo" class="logo">
        <img
          id="logo_img"
          class="logo_img"
          src="../assets/logos/icon-above-font-transp.png"
          alt="Groupomania logo"
        />
        <p></p>
      </div>
    </div>
    <aside id="profilBox" class="profilBox">
      <img
        v-if="!userDetails.photo_URL"
        class="pictureProfilMin"
        src="../assets/person.png"
        alt="Photo de profil"
      />
      <img
        v-else
        id="pictureProfilDefault"
        class="pictureProfilMin"
        :src="'../../' + userDetails.photo_URL"
        alt="Photo de profil"
      />
      <p>{{ userDetails.firstname }} {{ userDetails.lastname }}</p>
      <p>
        <em>{{ userDetails.job }}</em>
      </p>
    </aside>

    <div id="cartridge_Bottom">
      <NavComponent />
    </div>
  </header>
</template>

<script setup lang="ts">
import NavComponent from '@/components/Nav.vue';
import { computed, onMounted, reactive, } from "vue";
import store from '../store/index';

const myStore: any = store;

//Connexion au store pour récupération des informations
let userDetails = computed(() => store.getters.currentUser);


onMounted(() => {
  // Récupération de l' ID de l'utilisateur
  const currentUser = computed(() => myStore.state.auth.user);
  const myUserDetails = reactive(currentUser.value);
  myStore.dispatch("getUser", myUserDetails)
})


</script>


<style scoped lang="scss">
@import "../scss/variables.scss";

@media (max-width: 1199.99px) {
  #cartridge {
    background: linear-gradient(
      125deg,
      $gradientColor1 0%,
      $gradientColor2 50%
    );
    width: 100vw;
    min-height: 75px;
    max-height: 125px;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  #cartridge_Top {
    width: 30%;
    height: 100%;
    margin: auto;
    z-index: 0;

    #logo {
      width: 90%;
      height: 90%;
      margin: 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-item: center;

      img {
        width: 80%;
        line-height: 100%;
        margin: auto;
      }
    }
  }
  #profilBox {
    width: 30%;
    height: 90%;
    min-height: 90%;
    max-height: 90%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: $groupo-colorLight2;
    margin: auto;

    .pictureProfilMin {
      max-width: 30%;
      max-height: 30%;
      margin: 0 auto 10px auto;
      border-radius: 50%;
    }

    p {
      margin: 5px auto 5px auto;
    }
  }
  #cartridge_Bottom {
    width: 40%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
  }
}

@media (max-width: 767.99px) {
  #profilBox {
    display: none;
  }
}

@media (max-width: 575.99px) {

  #cartridge {
  background-color: $groupo-colorLight2;
  width: 100%;
  min-height: 50px;
  max-height: 75px;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}


}

#cartridge {
  background-color: $groupo-colorLight2;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}

.cartridge_Top {
  width: 100%;
  height: 45%;
  top: 0;
  margin: 0;
  background: linear-gradient(125deg, $gradientColor1 0%, $gradientColor2 50%);
  z-index: 0;

  .logo {
    width: 40%;
    margin: 0 auto 50px auto;

    .logo_img {
      width: 100%;
      margin-top: 50px;
    }
  }
}

.profilBox {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 20%;
  min-height: 300px;
  max-height: 400px;
  border-radius: 15px;
  background-color: $color-white;
  margin: -150px auto 35px auto;
  z-index: 50;

  .pictureProfilMin {
    max-width: 50%;
    max-height: 50%;
    margin: 0 auto 10px auto;
    border-radius: 50%;
  }

  p {
    margin: 5px auto 5px auto;
  }
}

#cartridge_Bottom {
  width: 100%;
  height: 50%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: -155px auto 0 auto;
}
</style>