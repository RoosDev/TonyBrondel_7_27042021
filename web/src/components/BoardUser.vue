<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import UserService from "../services/user.service";

export default {
  name: "User",
  data() {
    return {
      content: '',
    };
  },
  setup(){
      let content:any = '';

    onMounted(()=> {
        UserService.getUserBoard().then(
        (response) => {
            content = response.data;
        },
        (error) => {
            content =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
        );
    })
    return {
        content
    }
  }
};
</script>