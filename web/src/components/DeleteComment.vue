<template>
  <div id="DeletePost" class="col-12">
    <form id="postTextForm" v-on:submit.prevent="deleteMyPost">
      <div id="PostwriteContent">
        <label for="PostContent">
          <h2>Voulez-vous vraiment supprimer ce commentaire ?</h2>
          <p class="contentCommentToDelete">"{{ props.commentContent }}"</p>
        </label>
        <button id="confirmDelete" class="col-9" type="submit">Confirmer la suppression</button>
      </div>
    </form>
    <div id="messageFormDelete" class="hidebox"></div>
  </div>
</template>

<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

const props = defineProps<{
  commentId: number,
  commentContent: string,
}>()

const deleteMyPost = () => {
  const messageAfterDelete = document.querySelector('#messageFormDelete') as HTMLDivElement;
  const sendButton = document.querySelector('#confirmDelete') as HTMLButtonElement;


  myStore.dispatch("deleteComment", props.commentId)

    // axios.delete(urlApi)
    .then((res) => {
      sendButton.textContent = 'Suppression en-cours...';
      sendButton.setAttribute("disabled", "");
      messageAfterDelete.classList.toggle("hidebox");
      messageAfterDelete.classList.remove("nokSent");
      messageAfterDelete.classList.add("okSent");
      messageAfterDelete.innerHTML = '<p>Message supprimé avec succès.</p>';
      sendButton.textContent = 'supprimé';
      messageAfterDelete.classList.toggle("hidebox");
      store.commit('SETFEEDLIST');
      myRouter.go('');
    })
    .catch(err => {
      sendButton.setAttribute("disabled", "");
      messageAfterDelete.classList.toggle("hidebox");
      messageAfterDelete.classList.remove("okSent");
      messageAfterDelete.classList.add("nokSent");
      messageAfterDelete.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        messageAfterDelete.classList.toggle("hidebox");
      }, 5000);
      console.error("There was an error!", err);
    });
}

</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

#DeletePost {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  #postTextForm {
    width: 100%;
    #PostwriteContent {
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
          margin: 25px auto auto auto;
        }
      }
    }
  }
}
#confirmDelete {
  display: block;
  height: 60px;
  margin: 70px auto 50px auto;
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
#messageFormDelete {
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
.contentCommentToDelete {
  width: 100%;
  font-size: 1.2em;
  font-style: italic;
  text-align: center;
}
</style>