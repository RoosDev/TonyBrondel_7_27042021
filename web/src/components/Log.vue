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
        <div id="alertBox"></div>
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
      myRouter.push('/Home');
    })
    .catch((error) => {
      let msgError = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      if (msgError == undefined || msgError == null) {
        msgError = `Il semble qu'il y ait un problème. <br /> Vérifiez les informations saisies.`
      }
      alertBox.innerHTML = msgError;
      setTimeout(() => {
        alertBox.innerHTML = ` `
      }, 4000);
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
  height: 100%;
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
    font-size: 1.2em;
    font-weight: bold;

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
  color: $groupo-color2;
  font-weight: bold;
  font-size: 0.8em;
  text-align: center;
}
#alertBox {
  text-align: center;
  font-weight: bold;
}

@media (max-width: 575.99px) {
  #connectionBox {
    #secureTitle {
      p {
        font-size: 1.3em;
        margin-bottom: 5px;

      }
    }
    input {
      height: 20px;
    }
    button {
      margin : 10px 3px 10px 3px;
      font-size: 1.0em;
      &:hover{
        margin: 13px 0px 7px 6px ;
      }
    }
  }
}
</style>