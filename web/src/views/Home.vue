<template>
  <div id="Feed">
    <div id="profil" class="col-12 col-md-3">
      <Cartridge />
    </div>
      <Feed />
  </div>
</template>

<script lang="ts">
import Cartridge from '@/components/Cartridge.vue';
import Feed from '@/components/Feed.vue';


export default {
  name: 'Home',
  components: {
    Cartridge,
    Feed,
  },
}
</script>

<style lang="scss">
@import "../scss/variables.scss";

#profil {
  position: fixed;
  margin: 0;
  height: 100%;
}
</style>
