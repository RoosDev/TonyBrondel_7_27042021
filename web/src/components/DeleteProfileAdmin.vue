<template>
  <div id="ChangeProfile" class="col-12">
    <form id="DeleteProfileForm" v-on:submit.prevent="deleteMyProfile">
      <div id="messageDeleteProfile">
        <p>Souhaitez-vous vraiment supprimer le profil de </p>
        <p>{{ props.name }} ?</p>
      </div>
      <div id="cleanZone"></div>
      <div id="divdeleteProfileButton">
        <button
          id="deleteProfileButton"
          class="col-9"
          type="submit"
        >Je confirme la suppression.</button>
      </div>
    </form>
    <div id="msgProfileDelete" class="hidebox"></div>
  </div>
</template>
<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

const props = defineProps<{
  TheIdGetOut: number, 
  name: string,
  email: string,
  role: number
}>()

// Fonction d'enregistrement du nouveau mot de passe
const deleteMyProfile = () => {
  const msgProfileAfterSent = document.querySelector('#msgProfileDelete') as HTMLDivElement;
  const deleteProfileButton = document.querySelector('#deleteProfileButton') as HTMLButtonElement;

  myStore.dispatch("deleteProfileAdmin", {id: props.TheIdGetOut})
    .then((data) => {
      deleteProfileButton.textContent = 'envoi en-cours ...';
        msgProfileAfterSent.classList.remove("nokSent");
        msgProfileAfterSent.classList.add("okSent");
        msgProfileAfterSent.innerHTML = '<p>Profil Supprimé</p>';
        msgProfileAfterSent.classList.toggle("hidebox");
        deleteProfileButton.textContent = 'Au revoir';
    })
    .then((data) => {
      setTimeout(() => {
        msgProfileAfterSent.classList.toggle("hidebox");
        myRouter.go('');
      }, 1000);
    }),

    (error) => {
      msgProfileAfterSent.classList.toggle("hidebox");
      msgProfileAfterSent.classList.remove("okSent");
      msgProfileAfterSent.classList.add("nokSent");
      msgProfileAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        msgProfileAfterSent.classList.toggle("hidebox");
      }, 4000);
      console.error("There was an error!", error);
    }
}

</script>
<style lang="scss">
@import "../scss/variables.scss";

#modal-content {
  border: 0;
}

form {
  border: 0;
}
#messageDeleteProfile {
  width: 95%;
  margin-right: auto;
  margin-left: auto;
  height: 60px;

p {
    font-size: 1.4em;
    color: $groupo-color1;
    text-align: center;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
#divdeleteProfileButton {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #deleteProfileButton {
    width: 80%;
    height: 60px;
    margin: 20px auto 20px auto;
    border: 1px solid $groupo-color3;
    font-weight: bold;
    border-radius: 10px;
    background-color: rgba($groupo-color1, 0.3);
    color: $groupo-color3;

    &:hover {
      background-color: $groupo-color4;
      margin: 17px auto 23px auto;
      box-shadow: 5px 5px 15px $groupo-color3;
      color: $groupo-color1;
    }
  }
}
#cleanZone {
  height: 40px;
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
</style>