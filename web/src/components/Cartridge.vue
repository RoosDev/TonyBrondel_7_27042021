<template>
    <div id="cartridge" class="cartridge">
        <div id="cartridge_Top">
            <div id="logo">
                <img id="logo_img" src="../assets/logos/icon-above-font-transp.png" alt="Groupomania logo">
                <p></p>
            </div>
        </div>
        <div id="profilBox">
            <img id="pictureProfilMin" src="../assets/user-male.png" />
            <p>Jean Pranhune</p>
            <p><em>Responsable RH</em></p>
        </div>

        <div id="cartridge_Bottom">
            <nav class="row align-items-center col-md-6">
                <p class="col-md-6"><router-link to="/Home"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg><br/>Feed</router-link></p>
                <p class="col-md-6"><router-link to="/Profile"><font-awesome-icon :icon="['fas', 'users-cog']" id="fontawesome-icon" /><br/>Mon profil</router-link></p>
                <p class="col-md-6"><font-awesome-icon :icon="['fas', 'tools']" id="fontawesome-icon" /><br/>Administration</p>
                <p class="col-md-6"><a @click.prevent="logOut"><font-awesome-icon :icon="['fas', 'sign-out-alt']" id="fontawesome-icon" /><br/>Déconnexion</a></p>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { Vue } from 'vue-class-component'
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

// export { name: 'App'}
// export default class Cartridge extends Vue {}

 const logOut = () => {
      myStore.dispatch('auth/logout');
      myRouter.push('/');
    }

</script>


<style scoped lang="scss">
@import "../scss/variables.scss";

#cartridge {
  background-color: $groupo-colorLight2;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  #cartridge_Top {
    width: 100%;
    min-height: 50%;
    top: 0;
    margin: 0;
    background: linear-gradient(125deg, $gradientColor1 0%, $gradientColor2 50%);
    z-index: 0;

    #logo {
      width: 40%;
      margin: 0 auto 50px auto;

      #logo_img {
        width: 100%;
        margin-top: 50px;
      }
    }
  }

  #profilBox {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 250px;
    border-radius: 15px;
    background-color: $color-white;
    margin: -200px auto auto auto;
    z-index: 50;

    #pictureProfilMin {
      width: 30%;
      margin: 0 auto 10px auto;
    }

    p {
      margin: 5px auto 5px auto;
    }
  }

  #cartridge_Bottom {
    display: flex;

    nav {
      margin-right: auto;
      margin-left: auto;
      margin-top: 80px;

      p {
        font-size: 0.9em;
        margin-top: 10px;
        margin-bottom: 30px;
        text-align: center;

        #fontawesome-icon {
          font-size: 1.6em;
        }
      }
    }
  }
}

svg {
  font-size: 1.6em;
}
</style>