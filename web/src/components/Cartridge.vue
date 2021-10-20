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
                <p class="col-md-6"><font-awesome-icon :icon="['fas', 'rss']" id="fontawesome-icon" /><br/>Feed</p>
                <p class="col-md-6"><font-awesome-icon :icon="['fas', 'users-cog']" id="fontawesome-icon" /><br/>Mon profil</p>
                <p class="col-md-6"><font-awesome-icon :icon="['fas', 'tools']" id="fontawesome-icon" /><br/>Administration</p>
                <p class="col-md-6"><router-link to="/"><font-awesome-icon :icon="['fas', 'sign-out-alt']" id="fontawesome-icon" /><br/>Déconnexion</router-link></p>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

// export { name: 'App'}
export default class Cartridge extends Vue {}
</script>


<style scoped lang="scss">
@import "../scss/variables.scss";

#cartridge {
  background-color: $groupo-colorLight2;
  width: 100%;
  height: 100%;
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
</style>