<template>
  <div id="ChangeProfile" class="col-12">
    <Form
      id="changeProfileForm"
      @submit="sendMyNewProfile"
      :validation-schema="schemaChangeProfile"
    >
      <div id="changeProfileContent">
        <h2>Modification de votre profil</h2>
        <Field name="id" type="hidden" :value="currentUser.id" />

        <div id="signupLogin">
          <label for="email">Votre adresse email : *</label>
          <Field name="email" type="text" autocomplete="email" class="form-control" :value="email" />
        </div>
        <ErrorMessage name="email" class="error-feedback" />
        <div id="signupfirstname">
          <label for="firstname">Votre prénom : *</label>
          <Field name="firstname" type="text" class="form-control" :value="firstname" />
        </div>
        <ErrorMessage name="firstname" class="error-feedback" />
        <div id="signupLastName">
          <label for="LastName">Votre nom de famille : *</label>
          <Field name="lastname" type="text" class="form-control" :value="lastname" />
        </div>
        <ErrorMessage name="lastname" class="error-feedback" />
        <div id="signupjob">
          <label for="job">Votre poste : *</label>
          <Field name="job" type="text" class="form-control" :value="job" />
        </div>
        <ErrorMessage name="job" class="error-feedback" />
        <div id="signupdivision">
          <label for="division">Votre division : *</label>
          <br />
          <Field id="selectdivision" as="select" name="division">
            <option value="ERR" disabled>Sélectionnez la division</option>
            <option value="Achats" selected>Achats</option>
            <option value="Deploiement">Deploiement</option>
            <option value="Direction">Direction</option>
            <option value="Finance" selected>Finance</option>
            <option value="Foncier">Foncier</option>
            <option value="Franchise">Franchise</option>
            <option value="Logistique">Logistique</option>
            <option value="Marketing">Marketing</option>
            <option value="RH">RH</option>
          </Field>
        </div>
        <ErrorMessage name="division" class="error-feedback" />

        <div id="cleanZone"></div>
        <div id="divsendProfileButton">
          <button
            id="sendProfileButton"
            class="col-9"
            type="submit"
            :disabled="!isFormProfilValid"
          >Enregistrer</button>
        </div>
      </div>
    </Form>
    <div id="msgProfileSent" class="hidebox"></div>
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

const schemaChangeProfile = yup.object().shape({
  email: yup
    .string()
    .required("Email obligatoire")
    .email("Email invalide")
    .max(75, "maximum 75 caractères!"),
  firstname: yup
    .string()
    .required("Prénom obligatoire")
    .max(50, "maximum 50 caractères!"),
  lastname: yup
    .string()
    .required("Nom obligatoire")
    .max(75, "maximum 75 caractères!"),
  job: yup
    .string()
    .required("Poste obligatoire")
    .min(3, "minimum 3 caractères")
    .max(75, "maximum 75 caractères!"),
  division: yup
    .string()
    .required("Division obligatoire"),
});

const props = defineProps<{
  email: string,
  firstname: string,
  lastname: string,
  job: string,
  division: string
}>()

// Check du token avant redirection
const currentUser = computed(() => myStore.state.auth.user);

// Fonction d'enregistrement du nouveau mot de passe
const sendMyNewProfile = (user) => {
  const msgProfileAfterSent = document.querySelector('#msgProfileSent') as HTMLDivElement;
  const inputPass = document.querySelector('.firstname') as HTMLInputElement;
  const sendProfileButton = document.querySelector('#sendProfileButton') as HTMLButtonElement;

  myStore.dispatch("auth/changeProfile", user)
    .then((data) => {
        sendProfileButton.textContent = 'envoi en-cours ...',
          setTimeout(() => {
            msgProfileAfterSent.classList.remove("nokSent");
            msgProfileAfterSent.classList.add("okSent");
            msgProfileAfterSent.innerHTML = '<p>Profil mis à jour</p>';
            msgProfileAfterSent.classList.toggle("hidebox");
            inputPass.value = '';
            sendProfileButton.textContent = 'Enregistré';
          }, 1500),
          setTimeout(() => {
            msgProfileAfterSent.classList.toggle("hidebox");
            myRouter.go('');
          }, 3500),
          console.log('Profil à jour ;)', data)
      },

      (error) => {
        msgProfileAfterSent.classList.toggle("hidebox");
        msgProfileAfterSent.classList.remove("okSent");
        msgProfileAfterSent.classList.add("nokSent");
        msgProfileAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
        setTimeout(function () {
          msgProfileAfterSent.classList.toggle("hidebox");
        }, 5000);
        console.error("There was an error!", error);
      }
    )
}

const isFormProfilValid = computed((user) => {
  // if (
  //   user.email !== "" || user.firstname !== "" || user.lastname !== "" || user.job !== "" || user.division!== ""
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

  #changeProfileContent {
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
    select {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
      width: 300px;
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

    #divsendProfileButton {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      #sendProfileButton {
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
#cleanZone {
  height: 40px;
}

#msgProfileSent {
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
</style>