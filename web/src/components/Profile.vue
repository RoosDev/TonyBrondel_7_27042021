<template>
  <div id="profilePage" class="col-9">
    <div id="headProfile" class="col-12 col-md-9">
      <h2 class="col-9">Mon profil</h2>
      <div id="blockButton" class="col-3">
        <div id="navProfile" class="col-12">
          <button id="changeProfile" @click="toggleModal_EditProfil">
            <font-awesome-icon :icon="['fas', 'user-edit']" id="fontawesome-icon" />
          </button>
          <button id="changePassword" @click="toggleModal_Password">
            <font-awesome-icon :icon="['fas', 'key']" id="fontawesome-icon" />
          </button>
        </div>
      </div>
    </div>
    <div id="profileDetails" class="col-12 col-md-8">
      <div id="profilPicture" class="col-4">
        <img src="../assets/user-male.png" alt="Photo de profil" />
      </div>
      <div id="profilText" class="col-10">
        <div id="profilTextName">
          <span id="nameContent">{{ myName }}</span>
        </div>
        <div id="profilText_Email">
          <span id="emailTitle" class="identityTitle">Adresse email :</span>
          <span id="emailContent">{{ myUser.email }}</span>
        </div>
        <div id="profilText_Job">
          <span id="jobTitle" class="identityTitle">Poste :</span>
          <span id="jobContent">{{ myUser.job }}</span>
        </div>
        <div id="profilText_Division">
          <span id="divisionTitle" class="identityTitle col-3">Division :</span>
          <span id="divisionContent" class="col-9">{{ myUser.division }}</span>
        </div>
      </div>
    </div>
  </div>
  <Modal @close="toggleModal_EditProfil" :modalActive="modalActive_EditProfil">
    <div class="modal-content">
      <ChangeProfile
        :firstname="myUser.firstname"
        :lastname="myUser.lastname"
        :email="myUser.email"
        :job="myUser.job"
        :division="myUser.division"
      />
    </div>
  </Modal>

  <Modal @close="toggleModal_Password" :modalActive="modalActive_Password">
    <div class="modal-content">
      <ChangePass :email="myUser.email" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';
import ChangePass from '@/components/ChangePass.vue';
import ChangeProfile from '@/components/ChangeProfile.vue';
import { computed, onMounted } from "vue";
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

// initialisation du token
const currentUser = computed(() => myStore.state.auth.user);

//Connexion au store pour récupération des informations
const userDetail = computed(() => myStore.state.userDetail);
const myUser = userDetail.value;
const myName = myUser.firstname + ' ' + myUser.lastname;

// Vérification de l'authentification de l'utilisateur
onMounted(() => {
  // Connexion au Store de l'application
  myStore.dispatch("getUser", { id: currentUser.value.id })

})
const [modalActive_EditProfil, toggleModal_EditProfil] = useModal();
const [modalActive_Password, toggleModal_Password] = useModal();



</script>
<style lang="scss">
@import "../scss/variables.scss";

#profilePage {
  position: fixed;
  height: 100%;
  right: 0;
  background-color: $groupo-colorLight1;
  overflow-y: scroll;

  #headProfile {
    margin: 50px auto 50px auto;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 2.5em;
      font-weight: bold;
      text-decoration: underline;
      color: $groupo-color1;
    }

    #navProfile {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;

      button {
        display: block;
        border: 0;
        background-color: transparent;
        color: $groupo-color1;
        font-size: 1.5em;
        margin: 20px;

        &:hover {
          text-shadow: 2px 2px 5px $groupo-color4;
          margin: 23px 17px 17px 23px;
        }
      }
    }
  }
}

#profileDetails {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 2px solid $groupo-color1;
  border-radius: 15px;
  margin-top: 175px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;

  #profilPicture {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 250px;
    border: 2px solid $groupo-color1;
    border-radius: 15px;
    background-color: $groupo-color4;
    margin-top: -150px;
    z-index: 20;

    img {
      width: 75%;
      border: 0;
      margin: auto;
      border-radius: 50%;
    }
  }

  #profilText {
    margin: 40px;
    font-size: 1.2em;

    .identityTitle {
      font-weight: bold;
      margin-right: 25px;
    }
  }
  #profilTextName {
    width: 100%;
    margin: 0 auto 50px auto;
    font-size: 3em;
    font-weight: bold;
    text-align: center;
    color: $groupo-color1;
    text-shadow: 2px 2px 10px $groupo-color4;
  }

  div[id*="profilText_"] {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>