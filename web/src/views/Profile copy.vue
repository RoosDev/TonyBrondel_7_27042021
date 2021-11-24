<template>
    <div id="cartridge" class="col-12 col-md-3">
        <Cartridge />
    </div>
    <div id="profil"  class="col-12 col-md-9">
        <Profile />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Cartridge from '@/components/Cartridge.vue';
import Profile from '@/components/Profile.vue';
import store from '../store/index';
import { useRouter, useRoute } from "vue-router";


const myStore: any = store;
const myRouter: any = useRouter();

const currentUser = computed (() => myStore.state.auth.user);

onMounted(() => {
  if (!currentUser.value) {
    myRouter.push('/login');
  }
})


</script>

<style lang="scss">
@import "../scss/variables.scss";

template{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    height: 100vh;

    #cartridge{
        height: 100vh;

    }
    #profil {
        position: fixed;
        margin: 0;
        width: 100%;
    }
}
</style>
