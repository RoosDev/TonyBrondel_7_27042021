<template>
  <div id="connectionBox" class="row align-items-center" >
      <div id="secureTitle">
          <p><font-awesome-icon :icon="['fas', 'shield-alt']" /> Se connecter</p>
      </div>
      <form action="">
          <div id="secureLogin">
              <label for="login">Votre adresse email :</label>
              <input type="email" name="email" id="email" required>
          </div>
          <div id="securePassword">
              <label for="password">Votre mot de passe :</label>
              <input type="password" name="password" id="password" required>
          </div>    
          <div id="secureButtonMsg">
              <router-link to="/Feed"><button>Se connecter</button></router-link>
              <div id='alertBox'></div>
          </div>
      </form>       
  </div>
</template>
<script setup lang="ts">


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