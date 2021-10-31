<template>
  <div id="signupBox" class="row align-items-center">
    <div id="signupStart" class="col-12">
      <button id="SignupButton">s'inscrire</button>
    </div>
    <div id="signupZone" class="col-12 d-none">
      <div id="signupTitle">
        <p>
          <font-awesome-icon :icon="['fas', 'user-plus']" />S'inscrire
        </p>
      </div>
      <form action="" >
        <div id="signupLogin">
          <label for="Email">Votre adresse email : *</label>
          <input type="email" v-model="email" name="Email" id="Email" autofocus required />
        </div>
        <div id="signupPassword">
          <label for="Password">Votre mot de passe : *</label>
          <input type="password" v-model="password" name="Password" id="Password" required />
        </div>
        <div id="signupPassword2">
          <label for="Password2">Répétez votre mot de passe : *</label>
          <input type="password" v-model="password2" name="Password2" id="Password2" required />
        </div>
        <div id="signupFirstName">
          <label for="FirstName">Votre prénom : *</label>
          <input type="text" v-model="firstname" name="FirstName" id="FirstName" required />
        </div>
        <div id="signupLastName">
          <label for="LastName">Votre nom de famille : *</label>
          <input type="text" v-model="lastname" name="LastName" id="LastName" required />
        </div>
        <div id="signupJob">
          <label for="Job">Votre poste : *</label>
          <input type="text" v-model="job" name="Job" id="Job" required />
        </div>
        <div id="signupDivision">
          <label for="Division">Division : *</label>
          <br />
          <select name="Division" id="selectDivision" v-model="division" >
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
          </select>
        </div>
        <div id="signupButtonMsg">
          <router-link to="/">
            <button id="signupgo">S'enregistrer</button>
          </router-link>
          <div id="alertBox"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
// declare function require(path: string): any;
// const SignupService = require("../services/Signup_Service");

function signButton() {
  const signupStart = document.querySelector('#signupStart') as HTMLButtonElement;
  const signupZone = document.querySelector('#signupZone') as HTMLButtonElement;

  signupStart.classList.toggle('d-none');
  signupZone.classList.toggle('d-none')

}
// const Signup = {
//   data(){
//     return {
//       newUser: {
//         firstname: '',
//         lastname: '',
//         email: '',
//         password: '',
//         job: '',
//         division: '',
//       },
//       submitted: false
//     };
//   },
  // methods: {
  //   saveNewUser(){
  //     SignupService.create(newUser)
  //       .then(res => {
  //         this.newUser.firstname = res.data.Firstname;
  //         this.newUser.lastname = res.data.Lastname;
  //         this.newUser.email = res.data.Email;
  //         this.newUser.password = res.data.Password;
  //         this.newUser.job = res.data.Job;
  //         this.newUser.division = res.data.Division;
  //         this.submitted: true;
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       })
  //   },
  // },
// }


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