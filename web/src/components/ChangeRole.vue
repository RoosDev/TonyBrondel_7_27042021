<template>
  <div id="ChangeRole" class="col-12">
    <Form id="changeRoleForm" @submit="sendNewRole" :validation-schema="schemaChangeRole">
      <div id="changeRoleContent">
        <h2>Modification du niveau de responsabilité</h2>
        <p class="pbold">
          Utilisateur concerné :
          <br />
          <em>{{ name }} - {{ email }}</em>
        </p>
        <div id="divrole">
          <Field name="idToChange" type="hidden" :value="idToChange" />

          <label for="role">Sélectionner un rôle : *</label>
          <br />
          <Field id="selectrole" as="select" name="role">
            <option value="1">Utilisateur</option>
            <option value="2">Manager</option>
            <option value="3">Administrateur</option>
          </Field>
        </div>
        <ErrorMessage name="role" class="error-feedback" />

        <div id="cleanZone"></div>
        <div id="divsendRoleToChangeButton">
          <button :id="'sendRoleToChangeButton'+props.idToChange" class="col-9 sendRoleToChangeButton" type="submit">Enregistrer</button>
        </div>
      </div>
    </Form>
    <div :id="'msgRoleSent'+props.idToChange" class="hidebox msgRoleSent"></div>
  </div>
</template>
<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const myStore: any = store;
const myRouter: any = useRouter();

const schemaChangeRole = yup.object().shape({
  role: yup
    .string()
    .required("Division obligatoire"),
});

const props = defineProps<{
  idToChange: number,
  role: number,
  name: string,
  email: string,
}>()


// Fonction d'enregistrement du nouveau mot de passe
const sendNewRole = (usertoChange) => {
  const msgRoleAfterSent = document.querySelector('#msgRoleSent'+props.idToChange) as HTMLDivElement;
  const sendRoleToChangeButton = document.querySelector('#sendRoleToChangeButton'+props.idToChange) as HTMLButtonElement;
  
  myStore.dispatch("changeRole", usertoChange)
    .then((response) => {
      console.log('response > ', response)
      sendRoleToChangeButton.textContent = 'envoi en-cours ...';
      msgRoleAfterSent.classList.remove("nokSent");
      msgRoleAfterSent.classList.add("okSent");
      msgRoleAfterSent.innerHTML = '<p>Rôle mis à jour</p>';
      msgRoleAfterSent.classList.toggle("hidebox");
      sendRoleToChangeButton.textContent = 'Enregistré';
      myRouter.go('');
    })

    .catch((error) => {
      let msgError = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
      msgRoleAfterSent.classList.toggle("hidebox");
      msgRoleAfterSent.classList.remove("okSent");
      msgRoleAfterSent.classList.add("nokSent");
      msgRoleAfterSent.innerHTML = '<p>'+msgError+'</p>';
      setTimeout(function () {
        msgRoleAfterSent.classList.toggle("hidebox");
      }, 3500);
    });
}

// const isFormProfilValid = computed((user) => {
  // if (
  //   props.role !== "" 
  // ) {
  // return true;
  // } else {
  //   return false;
  // }
// })

</script>
<style lang="scss">
@import "../scss/variables.scss";

#ChangeRole {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  #changeRoleForm {
    width: 100%;
    border: 0;

    #changeRoleContent {
      width: 100%;
      border: 0;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      h2 {
        width: 100%;
        font-size: 1.4em;
        text-decoration: underline;
        font-weight: bold;
        color: $groupo-color5;
        text-align: center;
        margin-top: 25px;
      }
      .pbold {
        width: 80%;
        font-size: 1.4em;
        font-weight: bold;
        text-align: center;
        em {
          font-weight: normal;
        }
      }
      #divrole{
        width: 80%;
        label {
          font-size: 1.1em;
          margin-top: 15px;
          margin-bottom: 15px;
          
        }
        input {
          background-color: $groupo-color4;
          color: $groupo-colorLight1;
          width: 300px;
          height: 30px;
          margin: 15px;
          border: 0;
          border-radius: 10px;
          padding-left: 10px;
          padding-right: 10px;
          font-size: 0.9em;

          &:focus {
            background-color: $groupo-colorLight1;
            color: $groupo-color4;
          }
        }
        select {
          background-color: $groupo-color4;
          color: $groupo-colorLight1;
          width: 85%;
          height: 30px;
          border: 0;
          border-radius: 10px;
          padding-left: 10px;
          padding-right: 10px;
          font-size: 0.9em;

          &:focus {
            background-color: $groupo-colorLight1;
            color: $groupo-color4;
          }
        }
      }

      #divsendRoleToChangeButton {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        .sendRoleToChangeButton {
          width: 90%;
          height: 40px;
          margin: 20px auto 20px auto;
          border: 1px solid $groupo-color1;
          border-radius: 10px;
          background-color: $groupo-colorLight1;
          color: $groupo-color1;

          &:hover {
            background-color: $groupo-color4;
            color: $groupo-colorLight1;
            margin: 17px auto 23px auto;
            box-shadow: 5px 5px 15px $groupo-color3;
          }
        }
      }
    }
  }
}

#cleanZone {
  height: 40px;
}

.msgRoleSent {
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  height: 50px;
  border-radius: 15px;
  p {
    font-size: 1em;
    text-align: center;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 10px;
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
  #ChangeRole {
    #changeRoleForm {
      #changeRoleContent {
        .pbold  {
          font-size: 0.9em;
        }
        #divrole{
          label {
          font-size: 0.9em;

          }
        }
      }
    }
  }
}
.hidebox {
  display: none;
}

</style>