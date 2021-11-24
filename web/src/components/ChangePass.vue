<template>
  <div id="ChangePass" class="col-12">
    <Form id="changePassForm" @submit="sendMyNewPass" :validation-schema="schemaChangePass">
      <div id="changePassContent">
        <h2>Changement de mot de passe</h2>
        <p>
          <em>Critères: minimum 6 caractères dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.</em>
        </p>
        <Field name="id" type="hidden" :value="currentUser.id" />
        <Field name="hidemail" type="hidden" :value="email" />

        <div id="divPass1">
          <label for="password">Votre nouveau mot de passe :</label>
          <Field
            name="password"
            type="password"
            autocomplete="new-password"
            class="form-control inputPass"
            v-model="password"
          />
        </div>
        <ErrorMessage name="password" class="error-feedback" />
        <div id="divPass2">
          <label for="password2">Répéter le mot de passe :</label>
          <Field
            name="password2"
            type="password"
            autocomplete="new-password"
            class="form-control inputPass2"
            v-model="password2"
          />
        </div>
        <ErrorMessage name="password2" class="error-feedback" />
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

const schemaChangePass = yup.object().shape({
  password: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(6, "au moins 6 caractères!")
    .max(40, "Max 40 caractères!"),
  password2: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(6, "au moins 6 caractères!")
    .max(40, "Max 40 caractères!"),
});

const props = defineProps<{
  email: string
}>()

const password = '';
const password2 = '';

// Check du token avant redirection
const currentUser = computed(() => myStore.state.auth.user);

// Fonction d'enregistrement du nouveau mot de passe
const sendMyNewPass = (user) => {
  const messageAfterSent = document.querySelector('#msgFormSent') as HTMLDivElement;
  const inputPass = document.querySelector('.inputPass') as HTMLInputElement;
  const inputPass2 = document.querySelector('.inputPass2') as HTMLInputElement;
  const sendButton = document.querySelector('#sendButton') as HTMLButtonElement;

  if (user.password == user.password2) {

    myStore.dispatch("auth/changePass", user)
    .then((data) => {
        console.log('data >>> ', data)
      },
        sendButton.textContent = 'envoi en-cours ...',
      setTimeout(() => {
        messageAfterSent.classList.remove("nokSent");
        messageAfterSent.classList.add("okSent");
        messageAfterSent.innerHTML = '<p>Nouveau mot de passe enregistré <br /> Déconnexion en-cours...</p>';
        messageAfterSent.classList.toggle("hidebox");
        inputPass.value = '';
        inputPass2.value = '';
        sendButton.textContent = 'Envoyé';
      }, 1500),
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        myStore.dispatch('auth/logout');
        myRouter.push('/');
      }, 3000),
      console.log('Mot de passe ok ;)')

    ),
      (error) => {
        messageAfterSent.classList.toggle("hidebox");
        messageAfterSent.classList.remove("okSent");
        messageAfterSent.classList.add("nokSent");
        messageAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
        setTimeout(function () {
          messageAfterSent.classList.toggle("hidebox");
        }, 4000);
        console.error("There was an error!", error);
      }
  } else {
    messageAfterSent.classList.remove("okSent");
    messageAfterSent.classList.add("nokSent");
    messageAfterSent.classList.toggle("hidebox");
    messageAfterSent.innerHTML = '<p>Erreur de mot de passe.</p>';
    inputPass.value = '';
    inputPass2.value = '';

    setTimeout(() => {
      messageAfterSent.classList.toggle("hidebox");
      myRouter.go();
    }, 4000)
  }

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

  #changePassContent {
    border: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    p {
      width: 80%;
      text-align: center;
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
    #divSendButton {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      #sendButton {
        width: 300px;
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
    font-size: 1.0em;
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
</style>