<template>
  <div id="DeleteMyProfile" class="col-12">
    <form id="DeleteMyProfileForm" v-on:submit.prevent="deleteMyProfile">
      <div id="messageDeleteMyProfile">
        <h2>Souhaitez-vous vraiment supprimer votre profil ?</h2>
      </div>
      <div id="cleanZone"></div>
      <div id="divDeleteMyProfileButton">
        <button
          id="deleteMyProfileButton"
          class="col-9"
          type="submit"
        >Je confirme la suppression de mon profil .</button>
      </div>
    </form>
    <div id="msgMyProfileDelete" class="hidebox"></div>
  </div>
</template>
<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";
import { computed, reactive } from 'vue';

const myStore: any = store;
const myRouter: any = useRouter();


// Fonction d'enregistrement du nouveau mot de passe
const deleteMyProfile = () => {
  const msgMyProfileAfterSent = document.querySelector('#msgMyProfileDelete') as HTMLDivElement;
  const deleteMyProfileButton = document.querySelector('#deleteMyProfileButton') as HTMLButtonElement;
  const currentUser = computed(() => myStore.state.auth.user);
  const myUserDetails = reactive(currentUser.value);

  myStore.dispatch("deleteProfile", myUserDetails)
    .then((data) => {
      deleteMyProfileButton.textContent = 'envoi en-cours ...';
      setTimeout(() => {
        msgMyProfileAfterSent.classList.remove("nokSent");
        msgMyProfileAfterSent.classList.add("okSent");
        msgMyProfileAfterSent.innerHTML = '<p>Profil Supprimé</p>';
        msgMyProfileAfterSent.classList.toggle("hidebox");
        deleteMyProfileButton.textContent = 'Au revoir';
      }, 1000)
    })
    .then((data) => {
      setTimeout(() => {
        msgMyProfileAfterSent.classList.toggle("hidebox");
        localStorage.removeItem("user");
        myRouter.go('');
      }, 2000);
    }),

    (error) => {
      msgMyProfileAfterSent.classList.toggle("hidebox");
      msgMyProfileAfterSent.classList.remove("okSent");
      msgMyProfileAfterSent.classList.add("nokSent");
      msgMyProfileAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        msgMyProfileAfterSent.classList.toggle("hidebox");
      }, 4000);
      console.error("There was an error!", error);
    }
}

</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

  #DeleteMyProfileForm {
    width: 100%;
    border: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    #messageDeleteMyProfile {
      width: 100%;
      border: 0;
      margin-right: auto;
      margin-left: auto;
      height: 60px;
      h2 {
        width: 100%;
        font-size: 1.4em;
        text-decoration: underline;
        font-weight: bold;
        color: $groupo-color5;
        text-align: center;
        margin-top: 25px;
      }
    }
    #cleanZone {
      height: 40px;
    }

    #divDeleteMyProfileButton {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      #deleteMyProfileButton {
        width: 80%;
        height: 60px;
        margin: 50px auto 20px auto;
        border: 1px solid $groupo-color3;
        font-weight: bold;
        border-radius: 10px;
        background-color: rgba($groupo-color1, 0.3);
        color: $groupo-color3;
        font-size: 1.2em;


        &:hover {
          background-color: $groupo-color4;
          margin: 53px auto 17px auto;
          box-shadow: 5px 5px 15px $groupo-color3;
          color: $groupo-color1;
        }
      }
    }
  }
.okSent {
  background-color: #c8ffc8;
  p {
    color: #006500;
  }
}
.nokSent {
  background-color: #ffc8c8;
  p {
    color: #650000;
  }
}
@media (max-width: 575.99px) {
  #DeleteMyProfileForm {

    #divDeleteMyProfileButton {

      #deleteMyProfileButton {
        width: 90%;
        font-size: 0.9em;
      }
    }
  }
}
</style>