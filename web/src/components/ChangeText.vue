<template>
  <div id="PutText" class="col-12">
    <form id="putTextForm" v-on:submit.prevent="sendMyPut">
      <div id="PutwriteContent">
        <label for="PutContent">
          <h2>Lâchez nous vos pensées...</h2>
        </label>
        <textarea
          name="PutContent"
          :id="'PutContent' + props.postId"
          rows="6"
          :value="props.theContent"
          class="PutContentTextarea"
          autocapitalize="sentence"
          form="putTextForm"
          maxlength="500"
          placeholder="Saisissez ici votre prose..."
        ></textarea>
        <button
          id="sendButtonToChangePost"
          class="col-9"
          type="submit"
          :disabled="!isPutValid"
        >Enregistrer les modifications</button>
      </div>
    </form>
    <div id="msgFormSentToChangePost" class="hidebox"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';

const props = defineProps<{
  postId: number,
  theContent: string
}>()

const myStore: any = store;

const currentUser = computed(() => myStore.state.auth.user);

const sendMyPut = () => {
  const messageAfterSent = document.querySelector('#msgFormSentToChangePost') as HTMLDivElement;
  const PutContent = document.querySelector('#PutContent' + props.postId) as HTMLTextAreaElement;
  const sendButtonToChangePost = document.querySelector('#sendButtonToChangePost') as HTMLButtonElement;

  const theChangedPost = {
    postId: props.postId,
    content: PutContent.value,
    userId: currentUser.value.id,
    accessToken: currentUser.value.accessToken,
    roleToken: currentUser.value.roleToken,
  };

  myStore.dispatch("updatePost", theChangedPost)
    .then((data) => {
      sendButtonToChangePost.textContent = 'Modification en-cours...';
      sendButtonToChangePost.setAttribute("disabled", "");
      messageAfterSent.classList.toggle("hidebox");
      messageAfterSent.classList.remove("nokSent");
      messageAfterSent.classList.add("okSent");
      messageAfterSent.innerHTML = '<p>Modification enregistrée.</p>';
      sendButtonToChangePost.textContent = 'Modification enregistrée';

    })
    .catch((error) => {
      let msgError = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      if (msgError == undefined || msgError == null) {
        msgError = `Une erreur s'est produite. Veuillez réessayer.`
      }
      sendButtonToChangePost.setAttribute("disabled", "");
      messageAfterSent.classList.toggle("hidebox");
      messageAfterSent.classList.remove("okSent");
      messageAfterSent.classList.add("nokSent");
      messageAfterSent.innerHTML = '<p>' + msgError + '</p>';
      console.error("There was an error!", error);
    })
}

const isPutValid = () => {
  if (
    props.theContent !== ""
  ) {
    return true;
  } else {
    return false;
  }
}

</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

#PutText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  #putTextForm {
    width: 100%;

    #PutwriteContent {
      width: 100%;
      label {
        width: 100%;
        display: block;
        margin: 35px auto 0 auto;
        text-align: center;
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

      .PutContentTextarea {
        display: block;
        align-self: center;
        width: 85%;
        resize: none;
        margin: 50px auto 0 auto;
        border: 1px solid rgba($groupo-color4, 0.5);
        background-color: rgba($groupo-color4, 0.2);
        border-radius: 10px;

        &:hover {
          background-color: transparent;
        }
      }

      button {
        display: block;
        height: 40px;
        margin: 70px auto 50px auto;
        border: 1px solid $groupo-color1;
        border-radius: 10px;
        background-color: #92ff92;
        color: #006500;

        &:hover {
          border: 1px solid #006500;
          border-radius: 10px;
          background-color: rgba($likeColor, 0.5);
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
    }
  }

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }

  #msgFormSentToChangePost {
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
}
</style>