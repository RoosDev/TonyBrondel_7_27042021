<template>
  <div id="ChangePass" class="col-12">
    <Form id="changePassForm" @submit="sendMyNewPass" :validation-schema="schemaChangePass">
      <div id="changePassContent">
        <h2>Changement de mot de passe</h2>
        <p>
          <em>Critères: minimum 6 caractères dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.</em>
        </p>
        <div id="divPass1">
          <label for="password">Votre nouveau mot de passe :</label>
          <Field name="password" type="password" autocomplete="new-password" class="form-control" />
        </div>
        <ErrorMessage name="password" class="error-feedback" />
        <div id="divPass1">
          <label for="password2">Votre nouveau mot de passe :</label>
          <Field name="password2" type="password" autocomplete="new-password" class="form-control" />
        </div>
        <ErrorMessage name="password2" class="error-feedback" />
        <div id="divSendButton">
          <button id="sendButton" class="col-9" type="submit" :disabled="!isFormValid">Enregistrer</button>
        </div>
      </div>
    </Form>
    <div id="messageFormSent" class="hidebox"></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import axios from "axios";
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


const props = defineProps({
  password: String,
  password2: String
})

// Check du token avant redirection
const currentUser = computed(() => myStore.state.auth.user);
if (!currentUser.value) {
  myRouter.push('/login');
}

// Fonction d'enregistrement du nouveau mot de passe
const sendMyNewPass = (user) => {
  const messageAfterSent = document.querySelector('#msgFormSent') as HTMLDivElement;
  const imputPass = document.querySelector('input') as HTMLInputElement;
  const sendButton = document.querySelector('#sendButton') as HTMLButtonElement;

  console.log('passw1 >>  > ', props.password);
  console.log('passw2 >>  > ', props.password2);
  console.log('equal == >>  > ', props.password == props.password2);
  console.log('equal === >>  > ', props.password === props.password2);


  if (props.password == props.password2) {
    const urlApi = "http://localhost:3001/api/auth/profile/" + currentUser.value.id;
    console.log('id >> ', currentUser.value.id)
    const newPassword = props.password2;


    // axios.put(urlApi, newPassword)
    //   .then((res) => {

    myStore.dispatch("auth/register", user).then(
      (data) => {
        console.log('data >>> ', data)
      },
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        messageAfterSent.classList.remove("nokSent");
        messageAfterSent.classList.add("okSent");
        messageAfterSent.innerHTML = '<p>Nouveau mot de passe enregistré.</p>';
        messageAfterSent.classList.toggle("hidebox");
        sendButton.textContent = 'Enregistrer';
        imputPass.value = '';
        sendButton.textContent = 'Envoyé';
      }, 2500),
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        // myRouter.go();
      }, 5000),

      console.log('Mot de passe ok ;)')

    ),
      (err) => {
        sendButton.setAttribute("disabled", "");
        messageAfterSent.classList.toggle("hidebox");
        messageAfterSent.classList.remove("okSent");
        messageAfterSent.classList.add("nokSent");
        messageAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
        setTimeout(function () {
          messageAfterSent.classList.toggle("hidebox");
        }, 5000);
        console.error("There was an error!", err);
      }


  }

}
const isFormValid = computed(() => {
  if (
    props.password !== "" && props.password2 !== "" && props.password2 == props.password
  ) {
    return true;
  } else {
    return false;
  }
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
</style>