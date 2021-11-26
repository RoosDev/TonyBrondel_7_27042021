<template>
    <div id="profil" class="col-12 col-md-9">
        <Profile />
    </div>
</template>

<script setup lang="ts">
import Profile from '@/components/Profile.vue';
</script>

<style lang="scss">
@import "../scss/variables.scss";

template {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    height: 100vh;

    #profil {
        position: fixed;
        margin: 0;
        width: 100%;
    }
}
</style>
