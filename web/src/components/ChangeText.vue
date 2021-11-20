<template>
  <div id="PutText" class="col-12">
    <form id="putTextForm" v-on:submit.prevent="sendMyPut">
      <div id="PutwriteContent">
        <label for="PutContent">
          <h2>Lâchez nous vos pensées...</h2>
        </label>
        <textarea
          name="PutContent"
          id="PutContent"
          cols="65"
          rows="6"
          :value="content"
          autocapitalize="sentence"
          form="putTextForm"
          maxlength="500"
          placeholder="Saisissez ici votre prose..."
        ></textarea>
        <button
          id="sendButton"
          class="col-9"
          type="submit"
          :disabled="!isPutValid"
        >Enregistrer les modifications</button>
      </div>
    </form>
    <div id="msgFormSent" class="hidebox"></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps<{
  postId: number,
  content: string
}>()

const urlApi = "http://localhost:3001/api/feed/" + props.postId;
const myRouter: any = useRouter();

const sendMyPut = () => {
  const messageAfterSent = document.querySelector('#msgFormSent') as HTMLDivElement;
  const PutContent = document.querySelector('#PutContent') as HTMLTextAreaElement;
  const sendButton = document.querySelector('#sendButton') as HTMLButtonElement;

  const theChangedPost = {
    content: PutContent.value,
    userId: 1,
  };
  axios.put(urlApi, theChangedPost)
    .then((res) => {
      sendButton.textContent = 'Modification en-cours...';
      sendButton.setAttribute("disabled", "");
      messageAfterSent.classList.toggle("hidebox");
      messageAfterSent.classList.remove("nokSent");
      messageAfterSent.classList.add("okSent");
      messageAfterSent.innerHTML = '<p>Modification enregistrée.</p>';
      setTimeout(function () {
        messageAfterSent.classList.toggle("hidebox");
        sendButton.textContent = 'Poster';
        // PutContent.value = '';
      }, 3000);
      console.log('Post en ligne ;)', res)
      myRouter.go();

    })
    .catch(error => {
      sendButton.setAttribute("disabled", "");
      messageAfterSent.classList.toggle("hidebox");
      messageAfterSent.classList.remove("okSent");
      messageAfterSent.classList.add("nokSent");
      messageAfterSent.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer </p>';
      setTimeout(function () {
        messageAfterSent.classList.toggle("hidebox");
      }, 5000);
      console.error("There was an error!", error);
    });
}

const isPutValid = () => {
  if (
    props.content !== ""
  ) {
    return true;
  } else {
    return false;
  }
}

</script>
<style lang="scss">
@import "../scss/variables.scss";

#PutText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    margin: 35px auto 0 auto;
    text-align: center;
  }

  #PutContent {
    display: block;
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

  h2 {
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
  }

  #msgFormSent {
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