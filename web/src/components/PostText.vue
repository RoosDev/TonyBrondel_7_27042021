<template>
  <div id="PostText" class="col-12">
    <form id="postTextForm" v-on:submit.prevent="sendMyPost">
      <div id="PostwriteContent">
        <label for="PostContent">
          <h2>Lâchez nous vos pensées...</h2>
        </label>
        <textarea
          name="PostContent"
          id="PostContent"
          cols="65"
          rows="6"
          v-model="theNewPost.content"
          autocapitalize="sentence"
          form="postTextForm"
          maxlength="500"
          placeholder="Saisissez ici votre prose... (max: 500 caractères)"
          required
        ></textarea>
        <button id="sendButton" class="col-9" type="submit">Poster</button>
      </div>
    </form>
    <div id="messageFormSent" class="hidebox"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const myRouter: any = useRouter();

// Définition des variables
let errorMessage = '';
let newPost = '';

// Définition de l'ID utilisateur (avec le localstorage)
const meTheUser = JSON.parse(localStorage.getItem("user")!);
const userId = meTheUser.id;

// Nouvel objet à envoyer en base
let theNewPost = {
  content: newPost,
  userId: userId
};

// Fonction d'envoi du Post
const sendMyPost = () => {
  // Déclaration des variables
  const messageAfterSent = document.querySelector('#messageFormSent')! as HTMLDivElement;
  let PostContent = document.querySelector('#PostContent')! as HTMLTextAreaElement;
  const sendButton = document.querySelector('#sendButton')! as HTMLButtonElement;

  // Récupération du Token présent en LocalStorage
  const user = JSON.parse(localStorage.getItem("user")!);

  // Démarrage de la requête d'envoi du Post en DB via Axios
  axios.post("http://localhost:3001/api/feed", theNewPost, {
    headers: {
      "x-access-token": user.accessToken!,
      "x-role-token": user.roleToken!
    },
  })

    // Actions à mener lors du clic sur le bouton envoi
    .then((res) => {
      sendButton.textContent = 'Envoi en-cours...';
      sendButton.setAttribute("disabled", "");
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        messageAfterSent.classList.remove("nokSent");
        messageAfterSent.classList.add("okSent");
        messageAfterSent.innerHTML = '<p>Message envoyé avec succès.</p>';
        messageAfterSent.classList.toggle("hidebox");
        sendButton.textContent = 'Poster';
        PostContent.value = '';
        sendButton.textContent = 'Envoyé';
      }, 1500);
      setTimeout(() => {
        messageAfterSent.classList.toggle("hidebox");
        myRouter.go('');
      }, 2500);
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

      errorMessage = error.message;
      console.error("There was an error!", error);
    });
}

// Vérifiation si le post est valid pour activer le bouton d'envoi
const isCommentValid = computed(() => {
  if (
    theNewPost.content !== ""
  ) {
    return true;
  } else {
    return false;
  }
})

</script>
<style lang="scss">
@import "../scss/variables.scss";

#PostText {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    margin: 35px auto 0 auto;
    text-align: center;
  }

  textarea {
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
}
#messageFormSent {
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