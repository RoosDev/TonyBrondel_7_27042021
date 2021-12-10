<template>
  <div id="connectionBox" class="row align-items-center col-12">
    <div id="secureTitle" class="col-12">
      <p>
        <font-awesome-icon :icon="['fas', 'shield-alt']" />Se connecter
      </p>
    </div>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div id="secureLogin" class="col-12">
        <label for="login" class="col-12">Votre adresse email :</label>
        <Field
          id="email"
          name="email"
          type="text"
          autocomplete="email"
          class="form-control col-12"
          placeholder="jean.pranhune@grouporama.fr"
        />
        <!-- <input type="email" name="email" id="email" autocomplete="email" required> -->
      </div>
      <ErrorMessage name="email" class="error-feedback col-12" />
      <div id="securePassword">
        <label for="password" class="col-12">Votre mot de passe :</label>
        <Field
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          class="form-control col-12"
          placeholder="•••••••••"
        />
        <!-- <input type="password" name="current-password" id="password" autocomplete="current-password" required> -->
      </div>
      <ErrorMessage name="password" class="error-feedback col-12" />
      <div id="secureButtonMsg" class="col-12">
        <button type="submit" class="btn btn-primary btn-block">
          <span>Se connecter</span>
        </button>
        <div id="alertBox">  </div>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import store from '../store/index';
import { useRouter } from "vue-router";
import * as yup from "yup";

const myStore: any = store;
const myRouter: any = useRouter();

// fonction de login
const loggedIn = computed(() => myStore.state.auth.status.loggedIn)
if (loggedIn.value) {
  myRouter.push('/Home');
}

const schema = yup.object().shape({
  email: yup.string().required("Email obligatoire"),
  password: yup.string().required("Password obligatoire"),
});

// envoi des données pour se logger
const handleLogin = (user) => {
  let alertBox = document.querySelector('#alertBox') as HTMLButtonElement;

  myStore.dispatch("auth/login", user)
    .then((res) => {
      alertBox.innerHTML = `<svg class="w-6 h-6 svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
      setTimeout(() => {
        myRouter.push('/Home');
        console.log("message res : ", res)
      }, 1000);
    },
      (err) => {
        console.log("message err : ", err)
        console.log("message : ", err.message)
        console.log("message status : ", err.message.message)
          alertBox.innerHTML = `Il semble qu'il y ait un problème. <br /> Vérifiez les informations saisies.`
        setTimeout(() => {
          alertBox.innerHTML = ` `
        }, 5000);
      }
    );
}

</script>
<style scoped lang="scss">
@import "../scss/variables.scss";

#connectionBox {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 300px;
  border-radius: 15px;
  margin: auto;
  z-index: 50;

  #secureTitle {
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

  #secureLogin,
  #securePassword,
  #secureButtonMsg {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  label {
    font-size: 0.9em;
  }

  input {
    background-color: $groupo-color4;
    color: $groupo-colorLight1;
    width: 100%;
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
</style>