<template>
  <router-view/>
</template>

<script lang="ts">

</script>

<style lang="scss">
@import "./scss/variables.scss";

#app {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: $groupo-colorLight1;
  margin: 0;

  ::-webkit-scrollbar {
    width: 11px;
    color: $groupo-color1;
  }

  ::-webkit-scrollbar-track {
    background: $groupo-color4;
    width: 20px;
    -webkit-box-shadow: inset 0 0 6px rgba($groupo-colorLight1, 1);
  }

  ::-webkit-scrollbar-thumb {
    background: $groupo-color1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: $groupo-color1;
  }
}

</style>
