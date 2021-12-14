<template>
  <div id="adminUser" class="col-12 col-xl-9">
    <h2 id="h2Admin" class="col-12">Liste des utilisateurs</h2>
    <table id="TableUser" class="table table-striped table-hover col-12">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col" class="hideIfVeryTooSmall">Email</th>
          <th scope="col" class="hideIfTooSmall">Job</th>
          <th scope="col" class="hideIfSmall">Division</th>
          <th scope="col" v-if="myRole == 'okAGo' || myRole == 'okMGo'">Responsabilité</th>
          <th id="ActionTitle" scope="col" v-if="myRole == 'okAGo' || myRole == 'okMGo'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr id="RowUser" v-for="user in usersList" :key="user.id">
          <td scope="row" id="NameUser">{{ user.firstname + ' ' + user.lastname }}</td>
          <td id="emailUser" class="hideIfVeryTooSmall">
            <a :href="'mailto:' + user.email" class="lienEmail">{{ user.email }}</a>
          </td>
          <td id="jobUser" class="hideIfTooSmall">{{ user.job }}</td>
          <td id="divisionUser" class="hideIfSmall">{{ user.division }}</td>
          <td
            id="roleUser"
            class="txtcenter"
            v-if="myRole == 'okAGo' || myRole == 'okMGo'"
          >{{ user.role.role_name }}</td>
          <td id="actionsAdmin" class="txtcenter" v-if="myRole == 'okAGo' || myRole == 'okMGo'">
            <ButtonRole
              :idToChange="user.id"
              :name="user.firstname + ' ' + user.lastname"
              :email="user.email"
              :role="user.roleId"
            />
            <ButtonDelete
              v-if="myRole == 'okAGo'"
              :idToDelete="user.id"
              :name="user.firstname + ' ' + user.lastname"
              :email="user.email"
              :role="user.roleId"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import ButtonRole from '@/components/ButtonRole.vue';
import ButtonDelete from '@/components/ButtonDeleteProfile.vue';
import { computed, onMounted, reactive } from "vue";
import store from '../store/index';

// initialisation du store
const myStore: any = store;

//Connexion au store pour récupération des informations
const usersList = computed(() => myStore.state.users.usersList);
// Récupération du role de l'utilisateur
const currentUser: any = JSON.parse(localStorage.getItem("user")!);
const myRole: string = currentUser.canOrNot!;

onMounted(() => {
  const currentUser = computed(() => myStore.state.auth.user);
  const myUserDetails = reactive(currentUser.value);

  // Connexion au Store de l'application
  myStore.dispatch("getUsers", myUserDetails)
})


</script>
<style lang="scss">
@import "../scss/variables.scss";
#adminUser {
  position: fixed;
  height: 100%;
  right: 0;
  background-color: $groupo-colorLight1;
  overflow-y: scroll;
  
  #h2Admin {
    font-size: 2.5em;
    text-align: center;
    margin: 25px auto 35px auto;
    font-weight: bold;
    text-decoration: underline;
    color: $groupo-color1;
  }
  #TableUser {
    width: 90%;
    margin-left: auto;
    margin-right: auto;

    td {
      line-height: 100%;
      vertical-align: middle;
    }
  }

  .txtcenter {
    text-align: center;
  }

  button {
    display: block;
    border: 0;
    background-color: transparent;
    margin: 3px;

    .buttonIcon {
      font-size: 2em;

      &:hover {
        text-shadow: 2px 2px 5px $groupo-color4;
        color: $groupo-color1;
      }
    }
  }
  #actionsAdmin {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .lienEmail {
    color: $groupo-color2;
    text-decoration: none;

    &:hover {
      color: $groupo-color1;
    }
  }
}

@media (max-width: 991.99px) {
  #adminUser {
    position: absolute;
    .hideIfSmall {
      display: none;
    }
  }
}
@media (max-width: 767.99px) {
  .hideIfTooSmall {
    display: none;
  }
}

@media (max-width: 575.99px) {
  .hideIfVeryTooSmall {
    display: none;
  }
}

@media (max-width: 329.99px) {
  #TableUser {
    th {
      font-size: 0.8em;
    }
    td {
      font-size: 0.8em;
    }
  }
}
</style>