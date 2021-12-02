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
          value="tony@groupo.fr"
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
          value="Azerty-12!"
        />
        <!-- <input type="password" name="current-password" id="password" autocomplete="current-password" required> -->
      </div>
      <ErrorMessage name="password" class="error-feedback col-12" />
      <div id="secureButtonMsg" class="col-12">
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Se connecter</span>
        </button>
        <div id="alertBox" v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
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

let loading: any = ref(false);
let message: any = ref('');

// fonction de login
const loggedIn = computed(() => myStore.state.auth.status.loggedIn)
if (loggedIn.value) {
  setTimeout(() => {
    myRouter.push('/Home');
  }, 500);
}

const schema = yup.object().shape({
  email: yup.string().required("Email obligatoire"),
  password: yup.string().required("Password obligatoire"),
});

// envoi des données pour se logger
const handleLogin = (user) => {
  loading = true;
  myStore.dispatch("auth/login", user)
    .then((res) => {
      console.log('response log >> ', res.data)
        myRouter.push('/Home');
    },
      (error) => {
      console.log('response error >> ', error)
        loading = false;
        console.log(error)
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
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