<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { store } from '../store/index';
import router from "vue-router";

export default defineComponent({
  name: 'Profile',
  setup(){
    const myStore: any = store;
    const myRouter: any = router;

    const currentUser = computed(() => myStore.state.auth.user);

    if (!currentUser.value) {
      myRouter.push('/login');
    }

    return {
        currentUser
    }
  }
});

</script>