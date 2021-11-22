<template>
  <div id="Feed" class="col-12 col-md-9">
    <Feed />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Feed from '@/components/Feed.vue';
import store from '../store/index';
const myStore: any = store;

onMounted(() => {
  myStore.dispatch("getPosts")
})

</script>

<style lang="scss">
@import "../scss/variables.scss";

template {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
}
</style>
