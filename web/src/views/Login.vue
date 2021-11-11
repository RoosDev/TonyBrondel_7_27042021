<template>
  <div id="darkSide" class='col-12'>
    <!-- <div id='darkSide' class='col-12'> -->
      <div id="connectZone" class="col-md-6">
        <div id='connectZone__Login' class='col-md-5'>
        <Log />
        </div>
        <div id='connectZone__Boarder' class='col-md-2'>
        <p></p> 
        </div>
        <div id='connectZone__Signup' class='col-md-5'>
        <Signup />
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Signup from '@/components/Signup.vue';
import Log from '@/components/Log.vue';

@Options({
  components: {
    Signup,
    Log,
  },
})
export default class Login extends Vue { }
</script>
<style scoped lang='scss'>
@import "../scss/variables.scss";

#darkSide {
  position: fixed;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  background-color: $groupo-color2;
  background-image: url("../assets/Groupomania_Acces.jpg");
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

#connectZone {
  position: relative;
  min-height: 400px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  background-color: rgba($groupo-colorLight1, 0.6);
  box-shadow: -5px 0 20px $groupo-colorLight1;
  border-radius: 15px;
  z-index: 5;

  &:hover {
    box-shadow: 0 0 10px $groupo-color1;
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
    height: 405px;
    border-right: 1px solid $groupo-color1;
    border-left: 1px solid $groupo-color1;
    transform: rotate(5deg);
    filter: drop-shadow(5px 0 5px $groupo-color1);
    border-radius: 10px;
  }
}
</style>

