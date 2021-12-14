<template>
  <div id="ChangeProfile" class="col-12">
    <Form
      id="changeProfileForm"
      @submit="sendMyNewProfile"
      :validation-schema="schemaChangeProfile"
    >
      <div id="changeProfileContent">
        <h2>Modification de votre profil</h2>
        <Field name="id" type="hidden" :value="props.id" />
        <Field name="photo_URL" type="hidden" :value="oldUserDetail.photo_URL" />
        <Field name="email" type="hidden" :value="oldUserDetail.email" />

        <div id="changeLogin" class>
          <p>
            Votre email :
            <em>{{ oldUserDetail.email }}</em>
          </p>
        </div>
        <div id="changefirstname">
          <label for="firstname">Votre prénom : *</label>
          <Field
            name="firstname"
            type="text"
            class="form-control"
            :value="oldUserDetail.firstname"
          />
        </div>
        <ErrorMessage name="firstname" class="error-feedback" />
        <div id="changeLastName">
          <label for="LastName">Votre nom de famille : *</label>
          <Field name="lastname" type="text" class="form-control" :value="oldUserDetail.lastname" />
        </div>
        <ErrorMessage name="lastname" class="error-feedback" />
        <div id="changejob">
          <label for="job">Votre poste : *</label>
          <Field name="job" type="text" class="form-control" :value="oldUserDetail.job" />
        </div>
        <ErrorMessage name="job" class="error-feedback" />
        <div id="changedivision">
          <label for="division">Votre division : *</label>
          <br />
          <Field id="selectdivision" as="select" name="division">
            <option value="ERR" disabled>Sélectionnez la division</option>
            <option value="Achats" :selected="oldUserDetail.division == 'Achats'">Achats</option>
            <option
              value="Deploiement"
              :selected="oldUserDetail.division == 'Deploiement'"
            >Deploiement</option>
            <option value="Direction" :selected="oldUserDetail.division == 'Direction'">Direction</option>
            <option value="Finance" :selected="oldUserDetail.division == 'Finance'">Finance</option>
            <option value="Foncier" :selected="oldUserDetail.division == 'Foncier'">Foncier</option>
            <option value="Franchise" :selected="oldUserDetail.division == 'Franchise'">Franchise</option>
            <option value="Logistique" :selected="oldUserDetail.division == 'Logistique'">Logistique</option>
            <option value="Marketing" :selected="oldUserDetail.division == 'Marketing'">Marketing</option>
            <option value="RH" :selected="oldUserDetail.division == 'RH'">RH</option>
          </Field>
        </div>
        <ErrorMessage name="division" class="error-feedback" />

        <div id="cleanZone"></div>
        <div id="divsendProfileButton">
          <button id="sendProfileButton" class="col-9" type="submit">Enregistrer</button>
        </div>
      </div>
    </Form>
    <div id="msgProfileSent" class="hidebox"></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const myStore: any = store;

const schemaChangeProfile = yup.object().shape({
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
  id: number,
}>()

let oldUserDetail = computed(() => store.getters.currentUser)

// Fonction d'enregistrement du nouveau mot de passe
const sendMyNewProfile = (userDetail) => {
  const msgProfileAfterSent = document.querySelector('#msgProfileSent') as HTMLDivElement;
  const sendProfileButton = document.querySelector('#sendProfileButton') as HTMLButtonElement;

  myStore.dispatch("changeProfile", userDetail)
    .then((data) => {
      sendProfileButton.textContent = 'envoi en-cours ...';
      msgProfileAfterSent.classList.remove("nokSent");
      msgProfileAfterSent.classList.add("okSent");
      msgProfileAfterSent.innerHTML = '<p>Profil mis à jour</p>';
      msgProfileAfterSent.classList.toggle("hidebox");
      sendProfileButton.textContent = 'Enregistré';
    })

    .catch((error) => {
      let msgError = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(msgError);
      msgProfileAfterSent.classList.toggle("hidebox");
      msgProfileAfterSent.classList.remove("okSent");
      msgProfileAfterSent.classList.add("nokSent");
      msgProfileAfterSent.innerHTML = '<p>' + msgError + '</p>';
      setTimeout(() => {
        msgProfileAfterSent.classList.toggle("hidebox");

      }, 3500)
    })
}

</script>
<style lang="scss">
@import "../scss/variables.scss";

#modal-content {
  border: 0;
}

form {
  border: 0;
  width: 100%;

  #changeProfileContent {
    width: 100%;
    border: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    #changeLogin {
      width: 100%;
      margin: 10px auto 10px auto;
      p {
        width: 100%;
        text-align: center;
        font-weight: bold;
        em {
          font-weight: normal;
        }
      }
    }
    p {
      width: 80%;
      text-align: center;
    }

    div[id*="change"] {
      width: 100%;
      text-align: center;
    }

    input {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
      width: 60%;
      height: 30px;
      margin: 5px auto 8px auto;
      border: 0;
      border-radius: 10px;
      padding-left: 7px;
      padding-right: 7px;
      font-size: 0.9em;

      &:focus {
        background-color: $groupo-colorLight1;
        color: $groupo-color4;
      }
    }
    select {
      background-color: $groupo-color4;
      color: $groupo-colorLight1;
      width: 60%;
      height: 30px;
      margin-right: auto;
      margin-left: auto;
      border: 0;
      border-radius: 10px;
      padding-left: 7px;
      padding-right: 7px;
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
        margin: 5px auto 20px auto;
        border: 1px solid $groupo-color1;
        border-radius: 10px;
        background-color: $groupo-colorLight1;
        color: $groupo-color1;

        &:hover {
          background-color: $groupo-color4;
          color: $groupo-colorLight1;
          margin: 2px auto 23px auto;
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
  max-height: 40px;
  border-radius: 15px;
  p {
    font-size: 1em;
    text-align: center;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 7px;
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

@media (max-width: 767.99px) {
  form {
    #changeProfileContent {
      #changeLogin {
        p {
          display: none
        }
      }

      input {
        width: 70%;
      }
      select {
        width: 70%;
      }
      #divsendProfileButton {
        #sendProfileButton {
          width: 70%;
        }
      }
    }
  }
}

@media (max-width: 575.99px) {
  form {
    #changeProfileContent {
      input {
        width: 90%;
      }
      select {
        width: 90%;
      }
      #divsendProfileButton {
        #sendProfileButton {
          width: 90%;
        }
      }
    }
  }
}
</style>