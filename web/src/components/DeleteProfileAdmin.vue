<template>
  <div id="ChangeProfile" class="col-12">
    <form id="deleteTheProfileForm" v-on:submit.prevent="deleteTheProfile">
      <div id="messageDeleteTheProfile">
        <p>Souhaitez-vous vraiment supprimer le profil de </p>
        <p>{{ props.name }} ?</p>
      </div>
      <div id="cleanZone"></div>
      <div id="divdeleteTheProfileButton">
        <button
          id="deleteTheProfileButton"
          class="col-9"
          type="submit"
        >Je confirme la suppression.</button>
      </div>
    </form>
    <div id="msgTheProfileDelete" class="hidebox"></div>
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
const deleteTheProfile = () => {
  const msgTheProfileAfterSent = document.querySelector('#msgTheProfileDelete') as HTMLDivElement;
  const deleteTheProfileButton = document.querySelector('#deleteTheProfileButton') as HTMLButtonElement;

  myStore.dispatch("deleteProfileAdmin", {id: props.TheIdGetOut})
    .then((data) => {
      deleteTheProfileButton.textContent = 'envoi en-cours ...';
        msgTheProfileAfterSent.classList.remove("nokSent");
        msgTheProfileAfterSent.classList.add("okSent");
        msgTheProfileAfterSent.innerHTML = '<p>Profil Supprimé</p>';
        msgTheProfileAfterSent.classList.toggle("hidebox");
        deleteTheProfileButton.textContent = 'Au revoir';
    })
    .then((data) => {
      setTimeout(() => {
        msgTheProfileAfterSent.classList.toggle("hidebox");
        myRouter.go('');
      }, 1000);
    }),

    (error) => {
      msgTheProfileAfterSent.classList.toggle("hidebox");
      msgTheProfileAfterSent.classList.remove("okSent");
      msgTheProfileAfterSent.classList.add("nokSent");
      msgTheProfileAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        msgTheProfileAfterSent.classList.toggle("hidebox");
      }, 4000);
      console.error("There was an error!", error);
    }
}

</script>
<style lang="scss">
@import "../scss/variables.scss";

form {
  border: 0;
}
#messageDeleteTheProfile {
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
#divdeleteTheProfileButton {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #deleteTheProfileButton {
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