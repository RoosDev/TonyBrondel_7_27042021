<template>
  <main id="darkSide" class="col-12">
    <div id="connectZone" class="flex-md-row col-11 col-sm-11 col-md-11 col-lg-8 col-xl-6">
      <section id="connectZone__Login" class="col-12 col-md-5">
        <Log />
      </section>
      <div id="connectZone__Boarder" class="d-none d-md-block col-0 col-md-2">
        <p></p>
      </div>
      <section id="connectZone__Signup" class="col-12 col-md-5">
        <Signup />
      </section>
    </div>
  </main>
  <!-- <div id="appnoncompatible" class="col-10 d-sm-none">
    <p>La résolution de votre écran est incompatible avec cette application pour un usage optimal.</p>
    <p>Veuillez changé d'écran.</p>
  </div>-->
</template>

<script setup lang="ts">
import Signup from '@/components/Signup.vue';
import Log from '@/components/Log.vue';

</script>
<style scoped lang='scss'>
@import "../scss/variables.scss";

#darkSide {
  position: fixed;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: $groupo-color2;
  background-image: url("../assets/Groupomania_Acces.jpg");
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

#connectZone,
#appnoncompatible {
  position: relative;
  min-height: 400px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  margin: auto auto 5 auto;
  background-color: rgba($groupo-colorLight1, 0.7);
  box-shadow: -5px 0 20px $groupo-colorLight1;
  border-radius: 15px;
  padding: 0;
  z-index: 5;
  transition: all 700ms ease-in-out;

  &:hover {
    box-shadow: 0 0 10px $groupo-color1;
    background-color: rgba($color-white, 0.8);
    z-index: 2;
  }

  #connectZone__Login {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  #connectZone__Boarder {
    width: 5px;
    min-height: 405px;
    border-right: 1px solid $groupo-color1;
    border-left: 1px solid $groupo-color1;
    transform: rotate(5deg);
    filter: drop-shadow(5px 0 5px $groupo-color1);
    border-radius: 10px;
  }
}
#appnoncompatible {
  height: 150px;
  margin: 25px auto auto auto;

  p {
    font-weight: bold;
    text-align: center;
    font-size: 1.3em;
  }
}
@media screen and (max-width: 767.99px) {
  #darkSide {
    overflow-y: scroll;
    #connectZone {
      // position: absolute;
      overflow-y: auto;
      input {
        height: 20px;
      }
    }
  }
}
</style>

