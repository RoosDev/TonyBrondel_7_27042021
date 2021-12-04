<template>
  <div id="adminUser" class="col-12 col-xl-9">
    <h2 class="col-12">Liste des utilisateurs</h2>
    <table id="TableUser" class="table table-striped table-hover col-12">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col" class="hideIfTooSmall">Job</th>
          <th scope="col" class="hideIfSmall">Division</th>
          <th scope="col">Responsabilité</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr id="RowUser" v-for="user in usersList" :key="user.id">
          <td scope="row" id="NameUser">{{ user.firstname + ' ' + user.lastname }}</td>
          <td id="emailUser">{{ user.email }}</td>
          <td id="jobUser" class="hideIfTooSmall">{{ user.job }}</td>
          <td id="divisionUser" class="hideIfSmall">{{ user.division }}</td>
          <td id="roleUser" class="txtcenter">{{ user.role.role_name }}</td>
          <td id="actionsAdmin" class="txtcenter">
            <ButtonRole
              :idToChange="user.id"
              :name="user.firstname + ' ' + user.lastname"
              :email="user.email"
              :role="user.roleId"
            />
            <ButtonDelete
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
}
h2 {
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

txtcenter {
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

@media (max-width: 991.99px) {
  #adminUser {
    position: absolute;
  }
  .hideIfSmall {
    display: none;
  }
}
@media (max-width: 767.99px) {
  .hideIfTooSmall {
    display: none;
  }
}
</style>