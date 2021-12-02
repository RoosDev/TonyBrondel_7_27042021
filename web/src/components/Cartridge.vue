<template>
  <div id="cartridge" class="cartridge">
    <div id="cartridge_Top">
      <div id="logo">
        <img id="logo_img" src="../assets/logos/icon-above-font-transp.png" alt="Groupomania logo" />
        <p></p>
      </div>
    </div>
    <div id="profilBox">
      <!-- <img
        v-if="!myPicture"
        class="pictureProfilMin"
        src="../../public/Public_Images/Profile/user.png"
        alt="Photo de profil"
      />
      <img v-else id="pictureProfilDefault" class="pictureProfilMin" :src="myPictureURL" />
      <p>{{ myDetails.firstname }} {{ myDetails.lastname }}</p>
      <p>
        <em>{{ myDetails.job }}</em>
      </p> -->
    </div>

    <div id="cartridge_Bottom">
      <NavComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavComponent from '@/components/nav.vue';
import { computed, onMounted , reactive } from "vue";
import Vuex from 'vuex';
import store from '../store/index';

const myStore: any = store;

//Connexion au store pour récupération des informations
let userDetails = computed(() => myStore.state.userDetail);
// let myDetails = reactive(userDetails);
// let myPicture = myDetails.value.photo_URL;
// let myPictureURL = ('http://localhost:8080/' + myPicture);
// console.log('la photo /// ', myPictureURL)

// let getId = computed(() => { return Vuex.mapGetters(['auth/theUserId'])});
// console.log('getter pour id val  >> ',getId.value)
// console.log('getter pour id  >> ',getId)


let usersList = computed(() => { return Vuex.mapGetters(['usersBase/allUsers'])});
console.log('getter pour user val  >> ',usersList.value)
console.log('getter pour user  >> ',usersList)


console.log('myStore >> ',myStore)

onMounted(() => {
  // Récupération de l' ID de l'utilisateur
  const currentUser = computed(() => myStore.state.auth.user);
  const myId = currentUser.value.id!;
  // Connexion au Store de l'application
    myStore.dispatch("getUser", { id: myId })
})


</script>


<style scoped lang="scss">
@import "../scss/variables.scss";

#cartridge {
  background-color: $groupo-colorLight2;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  #cartridge_Top {
    width: 100%;
    height: 45%;
    top: 0;
    margin: 0;
    background: linear-gradient(
      125deg,
      $gradientColor1 0%,
      $gradientColor2 50%
    );
    z-index: 0;

    #logo {
      width: 40%;
      margin: 0 auto 50px auto;

      #logo_img {
        width: 100%;
        margin-top: 50px;
      }
    }
  }

  #profilBox {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 200px;
    border-radius: 15px;
    background-color: $color-white;
    margin: -150px auto auto auto;
    z-index: 50;

    .pictureProfilMin {
      width: 30%;
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
    margin: -25px auto 0 auto;
  }
}
</style>