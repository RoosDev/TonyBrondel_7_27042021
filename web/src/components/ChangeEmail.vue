<template>
  <div id="ChangeEmail" class="col-12">
    <Form id="changeEmailForm" @submit="sendMyNewEmail" :validation-schema="schemaChangeEmail">
      <div id="changeEmailContent">
        <h2>Changement de votre adresse email :</h2>
        <p>
          <em>Votre email actuel : {{ props.email }}</em>
        </p>
        <Field name="id" type="hidden" :value="props.id" />

        <div id="divEmailAdress">
          <label for="newEmail">Votre nouvel email :</label>
          <Field
            name="newEmail"
            type="email"
            autocomplete="newEmail"
            class="form-control inputEmail"
            v-model="newEmail"
          />
        </div>
        <ErrorMessage name="newEmail" class="error-feedback" />

        <div id="divSendButton">
          <button id="sendButton" class="col-9" type="submit" :disabled="!isFormValid">Enregistrer</button>
        </div>
      </div>
    </Form>
    <div id="msgFormSent" class="hidebox"></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const myStore: any = store;
const myRouter: any = useRouter();

const schemaChangeEmail = yup.object().shape({
  newEmail: yup
    .string()
    .required("Email obligatoire")
    .email("Email invalide")
    .max(125, "maximum 75 caractères!"),
});

const props = defineProps<{
  id: number,
  email: string
}>()
const newEmail = '';

// Fonction d'enregistrement du nouvel email
const sendMyNewEmail = (user) => {
  const messageAfterSent = document.querySelector('#msgFormSent') as HTMLDivElement;
  const inputEmail = document.querySelector('.inputEmail') as HTMLInputElement;
  const sendButton = document.querySelector('#sendButton') as HTMLButtonElement;

  // lancement de la modification du mot de passe
  myStore.dispatch("changeEmail", user)
    // ça fonctionne 
    .then((data) => {
      sendButton.setAttribute("disabled", "");
      sendButton.textContent = 'envoi en-cours ...',
        setTimeout(() => {
          messageAfterSent.classList.remove("nokSent");
          messageAfterSent.classList.add("okSent");
          messageAfterSent.innerHTML = '<p>Nouvelle adresse email enregistrée <br /> Déconnexion en-cours...</p>';
          messageAfterSent.classList.toggle("hidebox");
          inputEmail.value = '';
          sendButton.textContent = 'Envoyé';
        }, 100);
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        myStore.dispatch('auth/logout');
        myRouter.go('');
      }, 2000);
    })
    // ça ne fonctionne pas 
    .catch((error) => {
      sendButton.setAttribute("disabled", "");

      let msgError = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      if (msgError == undefined || msgError == null) {
        msgError = `Il semble qu'il y ait un problème. <br /> Vérifiez les informations saisies.`
      }

      messageAfterSent.classList.toggle("hidebox");
      messageAfterSent.classList.remove("okSent");
      messageAfterSent.classList.add("nokSent");
      messageAfterSent.innerHTML = '<p>' + msgError + '</p>';
      setTimeout(function () {
        sendButton.removeAttribute("disabled");
        messageAfterSent.classList.toggle("hidebox");
      }, 4000);
    })

}

const isFormValid = computed((user) => {
  // if (
  //   user.password != "" && user.password2 != "" && (user.password2 == user.password)
  // ) {
  return true;
  // } else {
  //   return false;
  // }
})

</script>
<style lang="scss">
@import "../scss/variables.scss";

#modal-content {
  border: 0;
}

form {
  border: 0;

  #changeEmailContent {
    width: 100%;
    border: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    p {
      width: 80%;
      text-align: center;
    }
    div[id*="div"] {
      width: 100%;
      text-align: center;
    }
    input {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
      width: 75%;
      height: 30px;
      margin: 15px auto 15px auto;
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
    #divSendButton {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      #sendButton {
        width: 75%;
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
#msgFormSent {
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
  form {
    font-size: 0.8em;
    #changeEmailContent {
      em {
        font-size: 0.8em;
      }
      input {
        width: 90%;
      }
      #divSendButton {
        #sendButton {
          width: 90%;
        }
      }
    }
  }
}
</style>