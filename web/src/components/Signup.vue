<template>
  <div id="signupBox" class="row align-items-center">
    <div id="signupStart" class="col-12">
      <button id="SignupButton" @click="signButton">s'inscrire</button>
    </div>
    <div id="signupZone" class="col-12 d-none">
      <div id="signupTitle">
        <p>
          <font-awesome-icon :icon="['fas', 'user-plus']" />S'inscrire
        </p>
      </div>
      <Form @submit="handleRegister" :validation-schema="schema">
      <!-- <form id="signUpForm" v-on:submit.prevent="sendMySignUp"> -->
        <div id="signupLogin">
          <label for="email">Votre adresse email : *</label>
          <Field name="email" type="text" autocomplete="email"  class="form-control" />
          <!-- <input 
            type="email" 
            v-model="theNewUser.email" 
            name="email" 
            id="email"
            autocomplete="email" 
            autofocus 
            required /> -->
        </div>
        <ErrorMessage name="email" class="error-feedback" />
        <div id="signupPassword">
          <label for="newPass">Votre mot de passe : *</label>
          <Field name="newPass" type="password" autocomplete="new-password" class="form-control" />
          <!-- <input
            type="password"
            v-model="theNewUser.newPass"
            name="newPass"
            id="newPass"
            autocomplete="new-password"
            required
          /> -->
        </div>
        <ErrorMessage name="newPass" class="error-feedback" />
        <div id="signupPassword2">
          
          <label for="newPassRepete">Répétez votre mot de passe : *</label>
          <Field name="newPassRepete" type="password" autocomplete="new-password" class="form-control" />
          <!-- <input
            type="password"
            v-model="newPassRepete"
            name="newPassRepete"
            id="newPassRepete"
            autocomplete="new-password"
            required
          /> -->
        </div>
        <ErrorMessage name="newPassRepete" class="error-feedback" />
        <div id="signupfirstname">
          <label for="firstname">Votre prénom : *</label>
          <Field name="firstname" type="text" class="form-control" />
          <!-- <input
            type="text"
            v-model="theNewUser.firstname"
            name="firstname"
            id="firstname"
            autocomplete="name"
            required
          /> -->
        </div>
        <ErrorMessage name="firstname" class="error-feedback" />
        <div id="signupLastName">
          <label for="LastName">Votre nom de famille : *</label>
          <Field name="lastname" type="text" class="form-control" />
          <!-- <input 
            type="text" 
            v-model="theNewUser.lastname" 
            name="LastName" 
            id="LastName" 
            autocomplete="family-name"
            required /> -->
        </div>
        <ErrorMessage name="lastname" class="error-feedback" />
        <div id="signupjob">
          <label for="job">Votre poste : *</label>
          <Field name="job" type="text" class="form-control" />
          <!-- <input type="text" v-model="theNewUser.job" name="job" id="job" required /> -->
        </div>
        <ErrorMessage name="job" class="error-feedback" />
        <div id="signupdivision">
          <label for="division">division : *</label>
          <br />
          <Field id="selectdivision" name="division" as="select">
          <!-- <select name="division" id="selectdivision" v-model="theNewUser.division"> -->
            <option value="ERR">Sélectionnez la division</option>
            <option value="Achats">Achats</option>
            <option value="Deploiement">Deploiement</option>
            <option value="Direction">Direction</option>
            <option value="Finance">Finance</option>
            <option value="Foncier">Foncier</option>
            <option value="Franchise">Franchise</option>
            <option value="Logistique">Logistique</option>
            <option value="Marketing">Marketing</option>
            <option value="RH">RH</option>
          <!-- </select> -->
          </Field>
        </div>
        <ErrorMessage name="division" class="error-feedback" />
        <div id="signupButtonMsg">
          <router-link to="/">
            <button id="sendSignUp" class="btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              S'inscrire
            </button>
          </router-link>
        </div>
        <div id="alertBox" 
          v-if="message" 
          class="alert" 
          :class="successful ? 'alert-success' : 'alert-danger'">
          {{ message }}
        </div>
      <!-- </form> -->
      </Form>
    </div>
  </div>
</template>
<script  lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { store } from '../store/index';
import router from "vue-router";
import * as yup from "yup";

export default defineComponent({
  name: "Signup",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email obligatoire")
        .email("Email invalide")
        .max(75, "maximum 75 caractères!"),
      password: yup
        .string()
        .required("Mot de passe obligatoire")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
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
      devision: yup
        .string()
        .required("Division obligatoire")
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  setup(){

    const myStore: any = store;
    const myRouter: any = router;
    let loading:any = ref(false);
    let successful:any = ref(false);
    let message:any = ref('');

    const loggedIn = computed(()  => myStore.state.auth.status.loggedIn);
      if (loggedIn.value) {
        myRouter.push("/profile");
      }

      const handleRegister = (user) => {
        message = "";
        successful = false;
        loading = true;

        myStore.dispatch("auth/signup", user).then(
          (data) => {
            message = data.message;
            successful = true;
            loading = false;
          },
          (error) => {
            message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            successful = false;
            loading = false;
          }
        );
      }
      
      const signButton = () => {
        const signupStart = document.querySelector('#signupStart') as HTMLButtonElement;
        const signupZone = document.querySelector('#signupZone') as HTMLButtonElement;

        signupStart.classList.toggle('d-none');
        signupZone.classList.toggle('d-none')
      }

      return {
        signButton,
        handleRegister
      }
      
  },
});
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
</style>