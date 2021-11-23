<template>
    <div id="admin"  class="col-12 col-md-9">
        <Admin />
    </div>
</template>

<script setup lang="ts">
import Admin from '@/components/Admin.vue';
</script>

<style lang="scss">
@import "../scss/variables.scss";

template{
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
