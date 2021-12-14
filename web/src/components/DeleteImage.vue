<template>
  <div id="DeleteImage" class="col-12">
    <form id="postImageForm" v-on:submit.prevent="deleteMyImage">
      <div id="PostImageContent">
        <label for="ImageContent">
          <h2>Voulez-vous vraiment supprimer ce post ?</h2>
        </label>
        <button id="confirmDeleteImage" class="col-9" type="submit">Confirmer la suppression</button>
      </div>
    </form>
    <div id="messageFormDeleteImage" class="hidebox"></div>
  </div>
</template>

<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

const props = defineProps<{
  postId: number,
}>()

const deleteMyImage = () => {
  const messageAfterDelete = document.querySelector('#messageFormDeleteImage') as HTMLDivElement;
  const sendButton = document.querySelector('#confirmDeleteImage') as HTMLButtonElement;

  myStore.dispatch("deletePost", props.postId)
    .then((res) => {
      sendButton.textContent = 'Suppression en-cours...';
      sendButton.setAttribute("disabled", "");
      setTimeout(function () {
        messageAfterDelete.classList.toggle("hidebox");
        messageAfterDelete.classList.remove("nokSent");
        messageAfterDelete.classList.add("okSent");
        messageAfterDelete.innerHTML = '<p>Message supprimé avec succès.</p>';
        sendButton.textContent = 'supprimé';
      }, 1000);
      setTimeout(() => {
        messageAfterDelete.classList.toggle("hidebox");
        myRouter.go('');
      }, 2000);
    })
    .catch(err => {
      sendButton.setAttribute("disabled", "");
      messageAfterDelete.classList.toggle("hidebox");
      messageAfterDelete.classList.remove("okSent");
      messageAfterDelete.classList.add("nokSent");
      messageAfterDelete.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        messageAfterDelete.classList.toggle("hidebox");
        myRouter.go('');

      }, 5000);
      console.error("There was an error!", err);
    });
}

</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

#DeleteImage {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  #postImageForm {
    width: 100%;
    #PostImageContent {
      width: 100%;
      label {
        width: 100%;

        h2 {
          width: 100%;
          font-size: 1.4em;
          text-decoration: underline;
          font-weight: bold;
          color: $groupo-color5;
          text-align: center;
          margin-top: 25px;
        }
      }
    }
  }
}
#confirmDeleteImage {
  display: block;
  height: 60px;
  margin: 45px auto 45px auto;
  border: 1px solid $groupo-color1;
  border-radius: 10px;
  background-color: #c8ffc8;
  color: #006500;

  &:hover {
    border: 1px solid #006500;
    border-radius: 10px;
    background-color: #ffc8c8;
    font-weight: bold;
  }

  &:disabled {
    border: 1px solid #650000;
    border-radius: 10px;
    background-color: rgba($groupo-color4, 0.2);
    font-style: italic;
    color: $groupo-color1;
  }
}
#messageFormDeleteImage {
  margin: auto;
  width: 70%;
  height: 40px;
  border-radius: 15px;
  p {
    text-align: center;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 10px;
  }
}
.okSent {
  background-color: #c8ffc8;
  p {
    color: #006500;
  }
}
.nokSent {
  background-color: #ffc8c8;
  p {
    color: #650000;
  }
}
</style>