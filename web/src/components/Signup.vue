<template>
  <div id="signupBox" class="row align-items-center col-12">
    <div id="signupStart" class="col-12">
      <button id="SignupButton" @click="signButton">s'inscrire</button>
    </div>
    <div id="signupZone" class="col-12 d-none">
      <div id="signupTitle" class="col-12">
        <p>
          <font-awesome-icon :icon="['fas', 'user-plus']" />S'inscrire
        </p>
      </div>
      <Form @submit="handleRegister" :validation-schema="schemaSignup" class="col-12">
        <div class="col-12">
          <div id="signupLogin" class="col-12">
            <label for="email" class="col-12">Votre adresse email : *</label>
            <Field
              name="email"
              type="text"
              autocomplete="email"
              class="form-control col-12"
              placeholder="jean.pranhune@grouprama.fr"
            />
          </div>
          <ErrorMessage name="email" class="error-feedback col-12" />
          <div id="signupPassword" class="col-12">
            <label for="password" class="col-12">Votre mot de passe : *</label>
            <Field
              name="password"
              type="password"
              autocomplete="new-password"
              class="form-control col-12"
              placeholder="•••••••••"
            />
          </div>
          <ErrorMessage name="newPass" class="error-feedback col-12" />
          <div id="signupfirstname" class="col-12">
            <label for="firstname" class="col-12">Votre prénom : *</label>
            <Field name="firstname" type="text" class="form-control col-12" placeholder="Jean" />
          </div>
          <ErrorMessage name="firstname" class="error-feedback col-12" />
          <div id="signupLastName" class="col-12">
            <label for="LastName" class="col-12">Votre nom de famille : *</label>
            <Field name="lastname" type="text" class="form-control col-12" placeholder="Pranhune" />
          </div>
          <ErrorMessage name="lastname" class="error-feedback col-12" />
          <div id="signupjob" class="col-12">
            <label for="job" class="col-12">Votre poste : *</label>
            <Field name="job" type="text" class="form-control col-12" placeholder="Photographe" />
          </div>
          <ErrorMessage name="job" class="error-feedback col-12" />
          <div id="signupdivision" class="col-12">
            <label for="division" class="col-12">Votre division : *</label>
            <br />
            <Field id="selectdivision" name="division" as="select" class="col-12">
              <option value="ERR" disabled>Sélectionnez la division</option>
              <option value="Achats">Achats</option>
              <option value="Deploiement">Deploiement</option>
              <option value="Direction">Direction</option>
              <option value="Finance">Finance</option>
              <option value="Foncier">Foncier</option>
              <option value="Franchise">Franchise</option>
              <option value="Logistique">Logistique</option>
              <option value="Marketing">Marketing</option>
              <option value="RH">RH</option>
            </Field>
          </div>
          <ErrorMessage name="division" class="error-feedback col-12" />
          <div id="signupButtonMsg" class="col-12">
            <button type="submit" class="btn btn-block" @click="sendButton">
              <span class="col-12">S'inscrire</span>
            </button>
          </div>
        </div>
      </Form>
    </div>
    <div id="signupEnd" class="col-12 d-none">
      <div id="iconSendSignup" class="col-12"></div>
      <div id="textSendSignup"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import store from '../store/index';
import * as yup from "yup";

const emit = defineEmits(['displayMessage'])

// formatage de l'objet user avec les données
const schemaSignup = yup.object().shape({
  email: yup
    .string()
    .required("Email obligatoire")
    .email("Email invalide")
    .max(75, "maximum 75 caractères!"),
  password: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(6, "au moins 6 caractères!")
    .max(40, "Max 40 caractères!"),
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

// déclaration des variables
const myStore: any = store;

// Fonction d'affichage du formulaire d'inscription
const signButton = () => {
  const signupStart = document.querySelector('#signupStart') as HTMLButtonElement;
  let signupZone = document.querySelector('#signupZone') as HTMLButtonElement;

  signupStart.classList.toggle('d-none');
  signupZone.classList.toggle('d-none')
}

const sendButton = () => {
  let signupZone = document.querySelector('#signupZone') as HTMLButtonElement;
  let signupEnd = document.querySelector('#signupEnd') as HTMLButtonElement;

  signupZone.classList.toggle('d-none')
  signupEnd.classList.toggle('d-none');
}

//  // Inscription
// Fonction d'envoi des données d'inscription
const handleRegister = (user) => {
  let iconSendSignup = document.querySelector('#iconSendSignup') as HTMLButtonElement;
  let textSendSignup = document.querySelector('#textSendSignup') as HTMLButtonElement;

  myStore.dispatch("auth/register", user).then(
    (data) => {
      iconSendSignup.innerHTML = `<svg class="w-6 h-6 svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
      textSendSignup.innerHTML = `Bienvenue, <br />Vous pouvez vous connecter à présent.`

    })
    .catch((error) => {
      let msgError = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
      textSendSignup.innerHTML = msgError||`Il semble qu'il y ait un problème. Ne seriez vous pas déja inscrit ?`
    }
  );
}

</script>
<style scoped lang="scss">
@import "../scss/variables.scss";

#signupBox {
  height: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;

  #signupStart {
    height: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    button {
      width: 200px;
    }
  }

  #signupZone {
    bottom: 0;

    #signupTitle {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      p {
        font-weight: bold;
        color: $groupo-color1;
        font-size: 1.5em;
      }
    }

    input {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
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

    select {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
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
  #signupEnd {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  label {
    font-size: 0.9em;
  }

  button {
    margin: 20px 3px 20px 3px;
    border: 1px solid $groupo-color1;
    border-radius: 10px;
    background-color: $groupo-colorLight1;
    width: 150px;
    color: $groupo-color1;

    &:hover {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
      margin: 17px 6px 23px 0;
      box-shadow: 5px 5px 15px $groupo-color3;
    }
  }
}
.error-feedback {
  width: 100%;
  color: red;
  font-weight: bold;
  font-size: 0.8em;
  text-align: center;
}

#iconSendSignup {
  width: 20%;
}
#textSendSignup{
  font-size: 1.3em;
  text-align: center;
}

.svg {
  color: $groupo-color1;
  // font-size: 4.0em;
}
.rotate {
  animation: rotation 500ms;
  animation-iteration-count: 100;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>