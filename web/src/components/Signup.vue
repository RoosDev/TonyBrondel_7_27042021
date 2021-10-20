<template>
  <div id="signupBox" class="row align-items-center">
    <div id="signupStart" class="col-12">
      <button @click="signButton" id="SignupButton">s'inscrire</button>
    </div>
    <div id="signupZone" class="col-12 d-none">
      <div id="signupTitle">
        <p><font-awesome-icon :icon="['fas', 'user-plus']" />
        S'inscrire</p>
      </div>
      <form action="">
        <div id="signupLogin">
          <label for="login">Votre adresse email : *</label>
          <input type="email" name="email" id="email" autofocus required />
        </div>
        <div id="signupPassword">
          <label for="password">Votre mot de passe : *</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div id="signupPassword2">
          <label for="password2">Répétez votre mot de passe : *</label>
          <input type="password" name="password2" id="password2" required />
        </div>
        <div id="signupFirstName">
          <label for="FirstName">Votre prénom : *</label>
          <input type="text" name="FirstName" id="FirstName" required />
        </div>
        <div id="signupLastName">
          <label for="LastName">Votre nom de famille : *</label>
          <input type="text" name="LastName" id="LastName" required />
        </div>
        <div id="signupJob">
          <label for="Job">Votre poste : *</label>
          <input type="text" name="Job" id="Job" required />
        </div>
        <div id="signupDivision">
          <label for="Division">Division : *</label>
          <br />
          <select name="Division" id="selectDivision">
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
            <button>S'enregistrer</button>
          </router-link>
          <div id="alertBox"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">

function signButton() {
  const signupStart = document.querySelector('#signupStart') as HTMLButtonElement;
  const signupZone = document.querySelector('#signupZone') as HTMLButtonElement;

    signupStart.classList.toggle('d-none');
    signupZone.classList.toggle('d-none')
  
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